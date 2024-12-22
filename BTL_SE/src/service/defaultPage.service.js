// import { Types } from "mongoose"
// import { cartModel } from "../model/cart.model.js"
// import { defaultPageModel } from "~/model/defaultPage.model.js"
// import { deleteUndefinedField } from "~/utils/helper.js"

// const updateStock = async ({ defaultPageId, quantity }) => {
//   const query = {
//     _id: new Types.ObjectId(defaultPageId)
//   }, update = {
//     $inc: {
//       stock: quantity,
//     }
//   }, option = { upsert: true, new: true }

//   return await defaultPageModel.findOneAndUpdate(query, update, option)
// }

// const setStock = async ({ defaultPageId, set_stock }) => {
//   const query = {
//     _id: new Types.ObjectId(defaultPageId)
//   }, update = {
//     $set: {
//       stock: set_stock,
//       default_stock: set_stock
//     }
//   }, option = { upsert: true, new: true }
//   return await defaultPageModel.findOneAndUpdate(query, update, option)
// }
// const createStock = async (default_stock) => {
//   return await defaultPageModel.create({
//     stock: default_stock,
//     default_stock: default_stock
//   })
// }
// export const cartService = {
//   updateStock,
//   setStock,
//   createStock
// }

import { userModel } from "~/model/user.model";
import { defaultPageModel } from "~/model/defaultPage.model";
const dotenv = require("dotenv");
dotenv.config();
const cron = require('node-cron');
let cronJobHK1
let cronJobHK2
// Cron job chạy hàng kỳ, add page for student 

// đang chỉ cho cronjob 1 chạy 
const setupCronJob = async () => {
  try {
    const defaultPageObjArray = await defaultPageModel.find({}).sort({ "createdAt": "asc" }).lean();
    console.log(defaultPageObjArray)
    const defaultPageObj = defaultPageObjArray[defaultPageObjArray.length - 1]
    console.log(defaultPageObj)
    if (cronJobHK1) {
      console.log("moi xoa cronjobHK1")
      cronJobHK1.stop();
      cronJobHK1 = null
    };
    // if (cronJobHK2) {
    //   console.log("moi xoa cronjobHK2")
    //   cronJobHK2.stop();
    //   cronJobHK2 = null
    // }
    const cronExpressionHK1 = "0 0 " + (new Date(defaultPageObj.startDateHK1).getDate()).toString() + " " + (new Date(defaultPageObj.startDateHK1).getMonth() + 1).toString() + " *";
    //const cronExpressionHK2 = "0 0 " + (new Date(defaultPageObj.startDateHK2).getDate()).toString() + " " + (new Date(defaultPageObj.startDateHK2).getMonth() + 1).toString() + " *";

    cronJobHK1 = cron.schedule(cronExpressionHK1, async () => {
      try {
        //const temp = await defaultPageModel.findById(process.env.ID_DEFAULT_PAGE);
        const defaultPageObjArray = await defaultPageModel.find({}).lean();
        const temp = defaultPageObjArray[defaultPageObjArray.length - 1]
        const batchUpdate = await userModel.updateMany({ admin: false }, { $inc: { numberPageValid: temp.defaultPage } });
        console.log(`Them trang cho tất cả sinh vien ky 1 thanh cong ${batchUpdate.modifiedCount}:`, defaultPageObj.startDateHK1);
      } catch (error) {
        console.error('Lỗi khi xử lý dữ liệu đầu kỳ 1:', error);
      }
    });
    // cronJobHK2 = cron.schedule(cronExpressionHK2, async () => {
    //   try {
    //     // const temp = await defaultPageModel.findById(process.env.ID_DEFAULT_PAGE);
    //     const defaultPageObjArray = await defaultPageModel.find({}).lean();
    //     const temp = defaultPageObjArray[defaultPageObjArray.length - 1]
    //     const batchUpdate = await userModel.updateMany({}, { $inc: { numberPageValid: temp.defaultPage } });
    //     console.log(`Them trang cho tất cả sinh vien ky 2 thanh cong ${batchUpdate.modifiedCount}:`, defaultPageObj.startDateHK2);
    //   } catch (error) {
    //     console.error('Lỗi khi xử lý dữ liệu đầu kỳ 2:', error);
    //   }
    // });
  } catch (error) {
    console.error('Error setting up cron job:', error);
  }
};

// Gọi hàm để thiết lập cron job

const createDefaultPage = async (reqBody) => {
  const newDefaulPage = await defaultPageModel.create(reqBody)
  await setupCronJob();
  console.log("xong taoj crojob")
  return newDefaulPage
}
const updateBody = async (reqBody) => {
  const newDefaulPage = await defaultPageModel.findOneAndUpdate({}, reqBody, { new: true })
  await setupCronJob();
  console.log("xong taoj crojob")
  return newDefaulPage
}
export const defaultPageService = {
  createDefaultPage,
  updateBody
}