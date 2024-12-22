import { Types } from "mongoose"
import { cartModel } from "../model/cart.model.js"
import { deleteUndefinedField } from "~/utils/helper.js"
import { findMethodOfModel } from "~/utils/helper.js"
import { redisService } from "./redis.service.js"
import { BadResponseError } from "~/cores/error.response.js"
// const createUserCart = async ({ userId, quantity = 1 }) => {
//   const query = {
//     // cart_userID: new Types.ObjectId(userId)
//     cart_userID: userId
//   }, updateOrInsert = {
//     $set: {
//       cart_quantity_pages: quantity
//     }
//   }, option = { upsert: true, new: true }
//   return await cartModel.findOneAndUpdate(query, updateOrInsert, option)
// }
const updateQuantityCart = async ({ userId, oldQuantity, newQuantity }) => {
  const query = {
    cart_userID: userId,
    cart_state: "active"
  }, update = {
    $inc: {
      cart_quantity_pages: newQuantity - oldQuantity,
    }
  }, option = { upsert: true, new: true }

  return await cartModel.findOneAndUpdate(query, update, option)
}
const updateQuantityCartRedis = async ({ userId, oldQuantity, newQuantity }) => {
  const newcart_quantity_pages = newQuantity - oldQuantity
  const keySerach = `cart:${userId}`
  return await redisService.incryHash(keySerach, newcart_quantity_pages)
}
const createCartForPurchase = async ({ userId, oldQuantity = 0, newQuantity }) => {
  return await updateQuantityCart({ userId: userId, oldQuantity: oldQuantity, newQuantity: newQuantity })
}
const createCartForPurchaseRedis = async ({ userId, oldQuantity = 0, newQuantity }) => {
  const keySerach = `cart:${userId}`
  const targetKey = await redisService.getHash(keySerach, "cart_quantity_pages")
  if (targetKey) {
    throw new BadResponseError("Cart đã tạo")
  }
  return await redisService.createHash(keySerach, { cart_quantity_pages: 0 })
}
const getCartByUser = async ({ userID }) => {
  // return await cartModel.find({ cart_userID: userID, cart_state: "active" }).lean()
  const query = { cart_userID: userID, cart_state: "active" }
  return await findMethodOfModel(query, cartModel)
}
const getAllCarts = async () => {
  // return await cartModel.find({}).lean()
  return await findMethodOfModel({}, cartModel)
}
const updateUserCart = async (userId, reqBody) => {
  const updateBody = deleteUndefinedField(reqBody)
  return await cartModel.findOneAndUpdate({ cart_userID: userId, cart_state: "active" }, updateBody, { new: true })
}
const deleteCartOfUser = async (userId) => {
  return await cartModel.findOneAndDelete({
    cart_userID: userId
  })
}
export const cartService = {
  // createUserCart,
  updateQuantityCart,
  getCartByUser,
  getAllCarts,
  updateUserCart,
  createCartForPurchase,
  deleteCartOfUser,
  updateQuantityCartRedis,
  createCartForPurchaseRedis
}