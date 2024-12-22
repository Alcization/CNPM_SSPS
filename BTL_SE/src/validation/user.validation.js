import Joi from 'joi'
import { UnprocessableError } from '~/cores/error.response'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
const login = async (req, res, next) => {
  const dataCorrection = Joi.object({
    email: Joi.string().email().pattern(/@hcmut\.edu\.vn$/).required(),
    // userId:Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    password: Joi.string().min(5).required()
  })
  try {
    await dataCorrection.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    throw new UnprocessableError("Invalid parameters in login!")
  }
}
const register = async (req, res, next) => {
  const dataCorrection = Joi.object({
    email: Joi.string().email().pattern(/@hcmut\.edu\.vn$/).required(),
    // userId:Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    password: Joi.string().min(7).required()
  })
  try {
    await dataCorrection.validateAsync(req.body, { allowUnknown: true })
    next()
  } catch (error) {
    throw new UnprocessableError("Invalid parameters in updateQuantityCart !")
  }
}
const verify_otp = async (req, res, next) => {
  const dataCorrection = Joi.object({
    email: Joi.string().email().pattern(/@hcmut\.edu\.vn$/).required(),
    // userId:Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    password: Joi.string().min(7).required(),
    otp: Joi.string().required()
  })
  try {
    await dataCorrection.validateAsync(req.body, { allowUnknown: true })
    next()
  } catch (error) {
    throw new UnprocessableError("Invalid parameters in updateQuantityCart !")
  }
}
const updateData = async (req, res, next) => {
  const dataCorrection = Joi.object({
    email: Joi.string().email().pattern(/@hcmut\.edu\.vn$/).required(),
    // userId:Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })
  try {
    await dataCorrection.validateAsync(req.body, { allowUnknown: true })
    next()
  } catch (error) {
    throw new UnprocessableError("Invalid parameters in updateQuantityCart !")
  }
}
const update = async (req, res, next) => {
  const dataCorrection = Joi.object({
    email: Joi.string().email().pattern(/@hcmut\.edu\.vn$/).required(),
    // userId:Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    password: Joi.string().min(7).required(),
    otp: Joi.string().required()
  })
  try {
    await dataCorrection.validateAsync(req.body, { allowUnknown: true })
    next()
  } catch (error) {
    throw new UnprocessableError("Invalid parameters in updateQuantityCart !")
  }
}
export const userValidation = {

  login, register,
  verify_otp,
  updateData,
  update
}