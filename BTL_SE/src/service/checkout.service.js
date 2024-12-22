import { cartModel } from "../model/cart.model.js";
import { orderModel } from "../model/order.model.js";
import { CreatedResponse, OKReponse } from "../cores/sucess.response.js";
import { BadResponseError, NotFoundError } from "../cores/error.response.js";
import { Schema, Types } from "mongoose";
import { orderService } from "./order.service.js";
import { cartService } from "./cart.service.js";
import { redisService } from "./redis.service.js";
const checkoutReview = async (userId, cartId, price) => {
  const targetCart = await cartModel.findOne({
    _id: new Types.ObjectId(cartId),
    cart_userID: userId
  }).lean()
  if (!targetCart) throw new NotFoundError("Cart is not found out to check out !")

  const total_price = targetCart.cart_quantity_pages * 200

  const checkout = {
    userId,
    cartId,
    price,
    quantity: targetCart.cart_quantity_pages,
    totalPrice: total_price,
  }

  return checkout
}
const checkoutReviewRedis = async (userId, price) => {
  const keySearch = `cart:${userId}`
  const targetCart = await redisService.getHash(keySearch, "cart_quantity_pages")
  if (!targetCart) throw new NotFoundError("Cart is not found out to check out !")

  const total_price = targetCart * 200
  // const total_price = targetCart.cart_quantity_pages * 200
  const checkout = {
    userId,
    // cartId,
    price,
    // quantity: targetCart.cart_quantity_pages,
    quantity: parseInt(targetCart),
    totalPrice: total_price,
  }

  return checkout
}
const orderByUser = async ({ cartId, userId, price, user_payment = "671db023ad6416223dc327ae", ipAddr, language, bankCode }) => {
  // const checkout = await checkoutReview(userId, cartId, price)
  const checkout = await checkoutReviewRedis(userId, price)
  console.log("checkout", checkout)
  //o day co ther them inventory
  // tao order
  const order = await orderModel.create({
    order_userID: userId,
    quantity: checkout.quantity,
    order_payment: new Types.ObjectId(user_payment)
  })

  // tao url
  console.log("ipAddr--------------->1", ipAddr)
  if (checkout.totalPrice <= 5000 || checkout.totalPrice >= 1000000000) {
    throw new BadResponseError("Total price must in range 5000 to 1000000000")
  }
  const createUrl = await orderService.create_payment_url({ orderId: order._id, amount: checkout.totalPrice, bankCode: bankCode, language: language, ipAddr: ipAddr })
  // update lai cart
  // await cartService.updateQuantityCart({ userId: userId, oldQuantity: checkout.quantity, newQuantity: 0 })
  const keySearch = `cart:${userId}`
  await redisService.releaseLock(keySearch)
  return createUrl
}
export const checkoutService = {
  checkoutReview,
  orderByUser,
  checkoutReviewRedis
}