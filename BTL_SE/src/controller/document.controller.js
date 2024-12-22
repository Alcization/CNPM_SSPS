import { documentService } from "../service/document.service.js"
import { BadResponseError } from "../cores/error.response.js"
import { OKReponse, CreatedResponse } from "~/cores/sucess.response.js"
import { redisService } from "~/service/redis.service.js"
import { checkCacheAndDb } from "~/utils/helper.js"
const getAllDocuments = async (req, res, next) => {
  const result = await documentService.getAllDocuments()
  new OKReponse({
    message: "Get all documents successfully!",
    metaData: result
  }).send(res)
}

const createDocument = async (req, res, next) => {
  if (!req.file) {
    throw new BadResponseError({ message: 'No file uploaded', statusCode: 400 })
  }
  //adding userconst 
  let totalPages = parseInt(req.body.totalPages)
  const pageType = req.body.pageType
  if (pageType === 'A1') {
    totalPages = 4 * totalPages
  }
  else if (pageType === 'A2') {
    totalPages = 3 * totalPages
  }
  else if (pageType === 'A3') {
    totalPages = 2 * totalPages
  }
  const documentData = {
    fileName: req.file.originalname,
    fileType: req.file.mimetype,
    fileUrl: (req.file.path || req.file.location || 'test-url'),
    totalPages: totalPages,
    printTime: new Date(),
    isDoubleSided: req.body.isDoubleSided === 'true',
    numCopies: parseInt(req.body.numCopies) || 1,
    studentId: req.user.userId,
    printerId: req.body.printerId,
    email: req.user.email,
    otp: req.body.otp,
    building: req.body.building,
    pageType: pageType,
    pageBefore: parseInt(req.body.totalPages)
  }

  const result = await documentService.createDocument(documentData)
  // caạp nhật database thì xóa reids user đó
  const targetUserDocs = await redisService.releaseLock(`document:${req.user.userId}`)
  if (targetUserDocs) {
    await documentService.getDocumentByUserId(req.user.userId, req.user.name)
  }
  new CreatedResponse({
    message: "File uploaded successfully!",
    metaData: result
  }).send(res)
}


const getDocumentById = async (req, res, next) => {
  const result = await documentService.getDocumentById(req.params.documentId)
  new OKReponse({
    message: "Get document successfully!",
    metaData: result
  }).send(res)
}

const getUserDocuments = async (req, res, next) => {
  const result = await documentService.getUserDocuments(req.user.userId)
  new OKReponse({
    message: "Get user documents successfully!",
    metaData: result
  }).send(res)
}

const updateDocument = async (req, res, next) => {
  const result = await documentService.updateDocument(req.params.documentId, req.body)
  new OKReponse({
    message: "Document updated successfully!",
    metaData: result
  }).send(res)
}

const deleteDocument = async (req, res, next) => {
  const result = await documentService.deleteDocument(req.params.documentId)
  new OKReponse({
    message: "Document deleted successfully!",
    metaData: result
  }).send(res)
}

const cancelPrintJob = async (req, res, next) => {
  const result = await documentService.cancelPrintJob(req.params.documentId)
  new OKReponse({
    message: "Print job cancelled successfully!",
    metaData: result
  }).send(res)
}

const getPrintQueue = async (req, res, next) => {
  const result = await documentService.getPrintQueue(req.query.printerId)
  new OKReponse({
    message: "Get print queue successfully!",
    metaData: result
  }).send(res)
}

const estimateCost = async (req, res, next) => {
  const result = await documentService.estimateCost(req.body)
  new OKReponse({
    message: "Cost estimated successfully!",
    metaData: { estimatedCost: result }
  }).send(res)
}
const getDocumentOfUser = async (req, res, next) => {
  const result = await documentService.getDocumentByUserId(req.user.userId, req.user.name)
  new OKReponse({
    message: "Get documents of user !",
    metaData: result
  }).send(res)
}
const generateOTPForUser = async (req, res, next) => {
  const result = await documentService.generateOtpForUser(req.user)
  new OKReponse({
    message: "Generate OTP successfully!",
    metaData: result
  }).send(res)
}
export const documentController = {
  getAllDocuments,
  createDocument,
  getDocumentById,
  getUserDocuments,
  updateDocument,
  deleteDocument,
  cancelPrintJob,
  getPrintQueue,
  estimateCost,
  getDocumentOfUser,
  generateOTPForUser
} 