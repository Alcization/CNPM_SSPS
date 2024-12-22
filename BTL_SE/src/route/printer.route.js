import { printerController } from "../controller/printer.controller.js";
import { handlerError } from "~/utils/handlerError.js";
import { authentication, checkRoleAdmin } from '~/utils/authUtils.js';
import express from 'express'
const printerRouter = express.Router();


printerRouter.use(authentication);
printerRouter.get('/', handlerError(printerController.getAllPrinters));
printerRouter.use(checkRoleAdmin);
printerRouter.get('/count', handlerError(printerController.getCountPrinters));
printerRouter.post('/create', handlerError(printerController.createPrinter));
printerRouter.patch('/:printerId', handlerError(printerController.updatePrinter));
printerRouter.delete('/:printerId', handlerError(printerController.deletePrinter));

export default printerRouter