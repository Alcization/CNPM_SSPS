
import { orderModel } from "../model/order.model.js"
import { paymentModel } from "../model/paymentActivity.model.js"
import { env } from "~/config/environment";

import moment from "moment";
import request from "request";
import { Types } from "mongoose";
import { findMethodOfModel } from "~/utils/helper.js";
import { userModel } from "~/model/user.model.js";

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
const create_payment_url = async (reqBody) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  // let ipAddr =
  //   req.headers["x-forwarded-for"] ||
  //   req.connection.remoteAddress ||
  //   req.socket.remoteAddress ||
  //   req.connection.socket.remoteAddress;


  let ipAddr = reqBody.ipAddr
  let tmnCode = env.VNP_TMNCODE;
  let secretKey = env.VNP_HASHSECRET;
  let vnpUrl = env.VNP_URL;
  let returnUrl = env.VNP_RETURNURL;
  let orderId = reqBody.orderId;
  let amount = reqBody.amount;
  let bankCode = reqBody.bankCode;

  let locale = reqBody.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);
  // console.log("secretKey-------->", secretKey)
  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  // res.set("Content-Type", "text/html");
  // res.send(JSON.stringify(vnpUrl));
  return JSON.stringify(vnpUrl)
}

const vnpay_return = async (reqBody) => {
  let vnp_Params = reqBody;

  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  let tmnCode = env.VNP_TMNCODE;
  let secretKey = env.VNP_HASHSECRET;

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
  if (secureHash === signed) {
    const orderId = vnp_Params["vnp_TxnRef"];
    console.log("reqBody::", reqBody)
    // truowc het kiemr tra thu order da duwocj them vaof payment hay chuwa vaf chuyen trang thai hay chuwa laij tiep tuc status laf pending
    const targetPayment = await paymentModel.findOne({ order_ID: orderId }).lean()

    if (targetPayment) {
      return { code: vnp_Params["vnp_ResponseCode"] }
    }
    let status_order
    // cac max 00 thanh cong, 24 laf cancel, max khac laf loi
    const code = vnp_Params["vnp_ResponseCode"]
    if (code == "00") {
      status_order = "success"
    }
    else if (code == "24") {
      status_order = "cancel"
    }
    else {
      status_order = "failed"
    }
    //update so trang khi hoan taat thanh toan cho sinh vien
    const order = await orderModel.findById(orderId).lean()
    await userModel.findOneAndUpdate(
      { _id: new Types.ObjectId(order.order_userID) },
      {
        $inc: {
          numberPageValid: order.quantity
        }
      }, {
      new: true
    })
    // neu howp lej thif them vao payment vaf thay doi status cho order
    const amount = vnp_Params["vnp_Amount"] / 100
    const newPayment = await paymentModel.create({
      order_ID: orderId,
      order_checkout: amount,
      transaction_code: vnp_Params["vnp_TransactionNo"],
      date_transcation: vnp_Params["vnp_TransactionNo"],
      bank_code: vnp_Params["vnp_BankCode"],
      date_transcation: vnp_Params["vnp_PayDate"],
      result_transaction: vnp_Params["vnp_TransactionStatus"]
    })
    // thay doi status cho order
    await orderModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(orderId)
      },
      {
        $set:
        {
          order_state: status_order,
          order_payment: new Types.ObjectId(newPayment._id)
        }
      },
      {
        new: true
      })
    // res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
    return { code: vnp_Params["vnp_ResponseCode"] }
  } else {
    // res.render("success", { code: "97" });
    return { code: "97" }
  }
}

const refund = async (reqBody) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";
  let date = new Date();

  let config = require("config");
  let crypto = require("crypto");

  let vnp_TmnCode = env.vnp_TmnCode;
  let secretKey = env.vnp_SecureHash;
  let vnp_Api = env.vnp_Api;

  let vnp_TxnRef = req.body.orderId;
  let vnp_TransactionDate = req.body.transDate;
  let vnp_Amount = req.body.amount * 100;
  let vnp_TransactionType = req.body.transType;
  let vnp_CreateBy = req.body.user;

  let currCode = "VND";

  let vnp_RequestId = moment(date).format("HHmmss");
  let vnp_Version = "2.1.0";
  let vnp_Command = "refund";
  let vnp_OrderInfo = "Hoan tien GD ma:" + vnp_TxnRef;

  let vnp_IpAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");

  let vnp_TransactionNo = "0";

  let data =
    vnp_RequestId +
    "|" +
    vnp_Version +
    "|" +
    vnp_Command +
    "|" +
    vnp_TmnCode +
    "|" +
    vnp_TransactionType +
    "|" +
    vnp_TxnRef +
    "|" +
    vnp_Amount +
    "|" +
    vnp_TransactionNo +
    "|" +
    vnp_TransactionDate +
    "|" +
    vnp_CreateBy +
    "|" +
    vnp_CreateDate +
    "|" +
    vnp_IpAddr +
    "|" +
    vnp_OrderInfo;
  let hmac = crypto.createHmac("sha512", secretKey);
  let vnp_SecureHash = hmac.update(new Buffer(data, "utf-8")).digest("hex");

  let dataObj = {
    vnp_RequestId: vnp_RequestId,
    vnp_Version: vnp_Version,
    vnp_Command: vnp_Command,
    vnp_TmnCode: vnp_TmnCode,
    vnp_TransactionType: vnp_TransactionType,
    vnp_TxnRef: vnp_TxnRef,
    vnp_Amount: vnp_Amount,
    vnp_TransactionNo: vnp_TransactionNo,
    vnp_CreateBy: vnp_CreateBy,
    vnp_OrderInfo: vnp_OrderInfo,
    vnp_TransactionDate: vnp_TransactionDate,
    vnp_CreateDate: vnp_CreateDate,
    vnp_IpAddr: vnp_IpAddr,
    vnp_SecureHash: vnp_SecureHash,
  };

  request(
    {
      url: vnp_Api,
      method: "POST",
      json: true,
      body: dataObj,
    },
    function (error, response, body) {
      console.log(response);
    }
  );
}
const deleteOrder = async (orderId) => {
  await paymentModel.findOneAndDelete({
    order_ID: orderId
  })
  const result = await orderModel.findOneAndDelete({
    _id: new Types.ObjectId(orderId)
  })
  return result
}
const deleteOrdersrByUser = async (userId) => {
  // const arrayOrderUser = await orderModel.find({
  //   order_userID: userId
  // })
  const query = {
    order_userID: userId
  }
  const arrayOrderUser = await findMethodOfModel(query, orderModel)
  arrayOrderUser.forEach(async order => {
    await deleteOrder(order._id)
    // console.log(order)
  })
  return { message: "xoa thanh cong" }
}
const getAllorders = async () => {
  // return await orderModel.find({}).lean()
  return await orderModel.find({})
    .populate('order_userID', 'givenName')
    .populate('order_payment', 'order_checkout')
    .sort({ 'createdOn': -1 })
    .lean()
}
const getOrderOfUser = async (userId) => {
  // return await orderModel.find({
  //   order_userID: userId
  // }).lean()
  const query = {
    order_userID: userId,
    order_state: 'success'
  }
  return await orderModel.find(query)
    .populate('order_payment', 'order_checkout date_transcation')
    .sort({ "createdOn": -1 })
    .limit(20)
}
const getOrderById = async (orderId) => {
  return await orderModel.findById(orderId).lean()
}
export const orderService = {
  create_payment_url,
  refund,
  vnpay_return,
  deleteOrder,
  deleteOrdersrByUser,
  getAllorders,
  getOrderOfUser,
  getOrderById
}