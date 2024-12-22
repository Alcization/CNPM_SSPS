import { cartController } from "../controller/cart.controller.js";
import { handlerError } from "~/utils/handlerError.js";
import { cartValidation } from "~/validation/cart.validation.js";
import { authentication, checkRoleAdmin } from '~/utils/authUtils';
import { orderController } from "~/controller/order.controller.js";
import express from 'express'

const cartRouter = express.Router();


cartRouter.use(authentication)
cartRouter.post('/test2', (req, res, next) => {
  console.log("dang test order router")
});
cartRouter.post('/createPaymentUrl', handlerError(orderController.orderByUser));
cartRouter.get('/user/:userId', handlerError(cartValidation.getCartByUser), handlerError(cartController.getCartByUser));
cartRouter.post('/createCart', handlerError(cartValidation.createCart), handlerError(cartController.createUserCart));
cartRouter.patch('/updateQuantity', handlerError(cartValidation.updateQuantityCart), handlerError(cartController.updateCartQuantity));
cartRouter.patch('/updateCart', handlerError(cartValidation.updateCart), handlerError(cartController.updateUserCart));


cartRouter.use(checkRoleAdmin)
cartRouter.get('/', handlerError(cartController.getAllCarts));
// router.delete('/:filename', fileController.deleteFile);

export default cartRouter