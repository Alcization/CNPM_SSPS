
import { cartService } from "../service/cart.service.js";
import { CreatedResponse, OKReponse } from "../cores/sucess.response.js";
import { checkoutService } from "../service/checkout.service.js";
import { orderService } from "../service/order.service.js";
const orderByUser = async (req, res, next) => {
  const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  // console.log("ipAddr----->", ipAddr)
  const result = await checkoutService.orderByUser({ ...req.body, ipAddr: ipAddr, userId: req.user.userId })
  new CreatedResponse({
    message: "taoj URL order thanh cong !",
    metaData: result
  }).send(res)
}
const return_url = async (req, res, next) => {
  const result = await orderService.vnpay_return(req.query)
  new CreatedResponse({
    message: "Get Url return order va cap nhan thanh cong !",
    metaData: result
  }).send(res)
}

const getAllorders = async (req, res, next) => {
  const result = await orderService.getAllorders()
  new OKReponse({
    message: "get all orders successfully !",
    metaData: result
  }).send(res)
}
const getOrderOfUser = async (req, res, next) => {
  const result = await orderService.getOrderOfUser(req.user.userId)
  new CreatedResponse({
    message: "delete all orders of user successfully !",
    metaData: result
  }).send(res)
}
const deleteOrdersrByUser = async (req, res, next) => {
  const result = await orderService.deleteOrdersrByUser(req.body.userId)
  new CreatedResponse({
    message: "delete all orders of user successfully !",
    metaData: result
  }).send(res)
}
const getOrderById = async (req, res, next) => {
  const result = await orderService.getOrderById(req.params.orderId)
  new CreatedResponse({
    message: "delete all orders of user successfully !",
    metaData: result
  }).send(res)
}
const deleteOrder = async (req, res, next) => {
  const result = await orderService.deleteOrder(req.params.orderId)
  new CreatedResponse({
    message: "delete all orders of user successfully !",
    metaData: result
  }).send(res)
}
export const orderController = {
  orderByUser,
  return_url,
  deleteOrdersrByUser,
  getAllorders,
  getOrderOfUser,
  getOrderById,
  deleteOrder
}