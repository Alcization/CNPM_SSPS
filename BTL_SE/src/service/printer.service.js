import { printerModel } from "../model/printer.model.js"
import { deleteUndefinedField } from "~/utils/helper.js"
import { findMethodOfModel } from "~/utils/helper.js"

const getAllPrinters = async () => {
  return await findMethodOfModel({}, printerModel)
}

const createPrinter = async (printerData) => {
  return await printerModel.create(printerData)
}

const updatePrinter = async (printerId, updateData) => {
  const updateBody = deleteUndefinedField(updateData)
  return await printerModel.findByIdAndUpdate(
    printerId,
    updateBody,
    { new: true }
  )
}
const countPrinterByStatus = async () => {
  return await printerModel.aggregate([
    {
      $group: {
        _id: "$status",    // Nhóm theo trường 'status'
        count: { $sum: 1 } // Đếm số lượng printer theo status
      }
    }
  ]).lean()
}
const countPrinterByDamageStatus = async () => {
  return await printerModel.aggregate([
    {
      $match: {
        status: 'DISABLED'
      },
      $group: {
        _id: "$status",    // Nhóm theo trường 'status'
        count: { $sum: 1 } // Đếm số lượng printer theo status
      }
    }
  ]).lean()
}
const deletePrinter = async (printerId) => {
  return await printerModel.findByIdAndDelete(printerId)
}

export const printerService = {
  getAllPrinters,
  createPrinter,
  updatePrinter,
  deletePrinter,
  countPrinterByStatus,
  countPrinterByDamageStatus
}