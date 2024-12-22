import Joi from 'joi'
import { UnprocessableError } from '~/cores/error.response'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
const generateOtp = async (req, res, next) => {
  const dataCorrection = Joi.object({
    email: Joi.string().email().pattern(/@hcmut\.edu\.vn$/).required(),
  })
  try {
    await dataCorrection.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    throw new UnprocessableError("Invalid parameters in create cart !")
  }
}
const uploadFile = async (req, res, next) => {
  const dataCorrection = Joi.object({
    otp: Joi.string().required(),
    documentFile: Joi.required(),
    printerId: Joi.string().required(),
    totalPages: Joi.number().required()
  })
  try {
    await dataCorrection.validateAsync(req.body, { allowUnknown: true })
    next()
  } catch (error) {
    const errorMessages = error.details.map(detail => detail.message);

    // Return response with validation error messages
    return res.status(422).json({
      message: "Invalid parameters in uploadFile!",
      errors: errorMessages
    });
  }
}
const getDocumentByUserId = async (req, res, next) => {
  const dataCorrection = Joi.object({
    userId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  })
  try {
    await dataCorrection.validateAsync(req.body, { allowUnknown: true })
    next()
  } catch (error) {
    throw new UnprocessableError("Invalid parameters in getDocumentByUserId !")
  }
}
export const documentValidation = {
  generateOtp,
  uploadFile,
  getDocumentByUserId
}