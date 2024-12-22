import { documentModel, PrintingStatusEnum } from "~/model/document.model.js"
import { BadResponseError } from "~/cores/error.response.js"
import { findMethodOfModel } from "~/utils/helper.js"
import { deleteFileFromCloud } from '../middleware/upload.middleware.js'
import { Types } from "mongoose"
import { checkCacheAndDb } from "~/utils/helper.js"
import { userModel } from "~/model/user.model.js"
import { otpService } from "./otp.service.js"
import { reportService } from "./report.service.js"
import { printerService } from "./printer.service.js"
const getAllDocuments = async () => {
  return await documentModel.find({}, 'printerId fileName printTime pageType pageBefore studentId')
    .populate('studentId', 'studentCode givenName')
    .sort({ createdAt: -1 })
    .lean()
}

const createDocument = async (documentData) => {
  console.log('Creating document with data:', documentData);

  //verify OTP to create User
  const targetOtp = await otpService.verifyOtp({ email: documentData.email, otp: documentData.otp })
  if (!targetOtp) {
    throw new BadResponseError('Invalid OTP !')
  }
  const { email, otp, ...data } = documentData
  const targetUser = await userModel.findById(documentData.studentId).lean()
  if (targetUser.numberPageValid < documentData.totalPages) {
    throw new BadResponseError("Sinh viên không đủ page để in !")
  }
  //update so giay cho sinh vien
  await userModel.findOneAndUpdate(
    { _id: new Types.ObjectId(documentData.studentId) },
    {
      $inc: {
        numberPageValid: -(documentData.totalPages)
      }
    },
    { new: true })
  // update report
  // const numberOfPrinterDamage = await printerService.countPrinterByDamageStatus()
  const obj = {
    printEachBuilding: {
      [documentData.building]: 1
    },
    pageEachType: {
      [documentData.pageType]: documentData.pageBefore
    }
  }
  await reportService.updateReport(obj)
  // them moi documnet
  const document = await documentModel.create({ ...data, status: 'COMPLETED' })
  return document
}

const getDocumentById = async (documentId) => {
  const document = await documentModel.findById(documentId)
    .populate('studentId', 'studentCode email givenName')
    .populate('printerId', 'printerName location')
  if (!document) throw new BadRequestError('Document not found')
  return document
}

const getUserDocuments = async (studentId) => {
  return await documentModel.find({
    studentId: studentId,
    status: 'COMPLETED'
  }, 'printerId fileName printTime pageType pageBefore studentId')
    // .populate('printerId', 'printerName location')
    .sort({ createdAt: 'desc' })
    .limit(20) // TOOIS DDA 20 TAI LIEUJ MOIW NHAT
    .lean()
}

const updateDocument = async (documentId, updateData) => {
  const document = await documentModel.findById(documentId)
  if (!document) throw new BadRequestError('Document not found')
  if (document.status !== PrintingStatusEnum.PENDING) {
    throw new BadRequestError('Can only update pending documents')
  }

  if (updateData.pageRange || updateData.numCopies || updateData.isDoubleSided) {
    updateData.estimatedCost = await calculateCost({
      ...document.toObject(),
      ...updateData
    })
  }

  return await documentModel.findByIdAndUpdate(
    documentId,
    updateData,
    { new: true }
  )
}

const deleteDocument = async (documentId) => {
  const document = await documentModel.findById(documentId)
  if (!document) throw new BadRequestError('Document not found')
  if (document.status === PrintingStatusEnum.PRINTING) {
    throw new BadRequestError('Cannot delete document while printing')
  }

  await deleteFileFromCloud(document.fileUrl)
  return await documentModel.findByIdAndDelete(documentId)
}

const cancelPrintJob = async (documentId) => {
  const document = await documentModel.findById(documentId)
  if (!document) throw new BadRequestError('Document not found')
  if (document.status !== PrintingStatusEnum.PENDING) {
    throw new BadRequestError('Can only cancel pending documents')
  }

  return await documentModel.findByIdAndUpdate(
    documentId,
    { status: PrintingStatusEnum.CANCELLED },
    { new: true }
  )
}

const getPrintQueue = async (printerId) => {
  return await documentModel.find({
    printerId,
    status: PrintingStatusEnum.PENDING
  }).sort({ printTime: 1 })
}

const estimateCost = async (documentData) => {
  return await calculateCost(documentData)
}

const calculateCost = async (documentData) => {
  const defaultPage = await DefaultPageModel.findOne()
  const pricePerPage = defaultPage.priceA4

  const pageCount = documentData.pageRange.end - documentData.pageRange.start + 1
  const totalPages = pageCount * documentData.numCopies
  return totalPages * pricePerPage
}
const getDocumentByUserId = async (userId, name) => {
  // const callBack = async (id) => {
  //   return await documentModel.find(
  //     {
  //       studentId: new Types.ObjectId(id),
  //       status: "PENDING"
  //     })
  //     .lean()
  // }
  const result = await checkCacheAndDb('document', userId, getUserDocuments)
  return result
}
const generateOtpForUser = async (reqBody) => {
  const isInValidEmail = await userModel.findOne({ email: reqBody.email })
  //check email user
  if (!isInValidEmail) {
    throw new BadResponseError('Email khong tồn tại !')
  }
  const otp = await otpService.generateOtp(reqBody)
  return otp
}
export const documentService = {
  getAllDocuments,
  createDocument,
  getDocumentById,
  getUserDocuments,
  updateDocument,
  deleteDocument,
  cancelPrintJob,
  getPrintQueue,
  estimateCost,
  getDocumentByUserId,
  generateOtpForUser
} 