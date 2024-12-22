import express from "express";
import orderRouter from "./order.route.js";
import cartRouter from "./cart.route.js";
import uploadRouter from "./upload.Route.js";
import userRouter from "./user.route.js";
import documentRouter from "./document.route.js";
import printerRouter from "./printer.route.js";
import defaultPagerouter from "./defaultPage.route.js";
import reportRouter from "./report.route.js";

const Router = express.Router();


Router.use('/user', userRouter);
Router.use('/order', orderRouter);
Router.use('/cart', cartRouter);
Router.use('/document', documentRouter);
Router.use('/printer', printerRouter);
// Router.use('/file', uploadRouter);
Router.use('/defaultPage', defaultPagerouter);
Router.use('/report', reportRouter);

export default Router