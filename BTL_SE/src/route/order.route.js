import { orderController } from '../controller/order.controller.js';
import { handlerError } from '~/utils/handlerError.js';
import { orderValidation } from '~/validation/order.validation.js';
import express from 'express'
import { authentication, checkRoleAdmin } from '~/utils/authUtils.js';
const orderRouter = express.Router();


orderRouter.get('/return_url', handlerError(orderController.return_url));
orderRouter.use(authentication)
orderRouter.post('/createPaymentUrl', handlerError(orderController.orderByUser));
// orderRouter.post('/test2', handlerError(orderController.orderByUser))

orderRouter.get('/user', handlerError(orderController.getOrderOfUser));

// router.delete('/:filename', fileController.deleteFile);
orderRouter.get('/getAllOrders', checkRoleAdmin, handlerError(orderController.getAllorders));
// orderRouter.get('/:orderId', handlerError(orderController.getOrderById));
orderRouter.post('/deleteOrdersUser', checkRoleAdmin, handlerError(orderValidation.getOrdersByUser), handlerError(orderController.deleteOrdersrByUser));
orderRouter.delete('/deleteOrder/:orderId', checkRoleAdmin, handlerError(orderValidation.getOrderById), handlerError(orderController.deleteOrder));

export default orderRouter