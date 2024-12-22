
import { cartService } from "../service/cart.service.js";
import { CreatedResponse, OKReponse } from "../cores/sucess.response.js";

const createUserCart = async (req, res, next) => {
  // const result = await cartService.createCartForPurchase({ ...req.body, userId: req.user.userId })
  const result = await cartService.createCartForPurchaseRedis({ ...req.body, userId: req.user.userId })
  new CreatedResponse({
    message: "Tao cart thanh cong !",
    metaData: result
  }).send(res)
}

const getCartByUser = async (req, res, next) => {
  const result = await cartService.getCartByUser(req.params.userId)
  new OKReponse({
    message: "Get cart by user !",
    metaData: result
  }).send(res)
}
const updateCartQuantity = async (req, res, next) => {
  // const result = await cartService.updateQuantityCart({ ...req.body, userId: req.user.userId })
  const result = await cartService.updateQuantityCartRedis({ ...req.body, userId: req.user.userId })
  new OKReponse({
    message: "Update quantity successfully !",
    metaData: result
  }).send(res)
}
const getAllCarts = async (req, res, next) => {
  const result = await cartService.getAllCarts()
  new OKReponse({
    message: "Get All cart successfully !",
    metaData: result
  }).send(res)
}
const updateUserCart = async (req, res, next) => {
  const result = await cartService.updateUserCart()
  new OKReponse({
    message: "Update cart successfully !",
    metaData: result
  }).send(res)
}
export const cartController = {
  createUserCart,
  getCartByUser,
  updateCartQuantity,
  getAllCarts,
  updateUserCart
}