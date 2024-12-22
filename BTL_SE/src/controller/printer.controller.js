import { printerService } from "../service/printer.service.js";
import { CreatedResponse, OKReponse } from "../cores/sucess.response.js";
import { printerModel } from "~/model/printer.model.js";
const getAllPrinters = async (req, res, next) => {
  const result = await printerService.getAllPrinters()
  new OKReponse({
    message: "Get all printers successfully!",
    metaData: result
  }).send(res)
}

const createPrinter = async (req, res, next) => {
  const result = await printerService.createPrinter(req.body)
  new CreatedResponse({
    message: "Printer created successfully!",
    metaData: result
  }).send(res)
}

const updatePrinter = async (req, res, next) => {
  const result = await printerService.updatePrinter(req.params.printerId, req.body)
  new OKReponse({
    message: "Printer updated successfully!",
    metaData: result
  }).send(res)
}

const deletePrinter = async (req, res, next) => {
  const result = await printerService.deletePrinter(req.params.printerId)
  new OKReponse({
    message: "Printer deleted successfully!",
    metaData: result
  }).send(res)
}
const getCountPrinters = async (req, res, next) => {
  const result = await printerModel.aggregate([
    {
      $group: {
        _id: "$status", // Group by 'status'
        count: { $sum: 1 } // Count documents in each group
      }
    }
  ])
  new OKReponse({
    message: "Printer deleted successfully!",
    metaData: result
  }).send(res)
}
export const printerController = {
  getAllPrinters,
  createPrinter,
  updatePrinter,
  deletePrinter,
  getCountPrinters
}