import Joi from 'joi'
import { UnprocessableError } from '~/cores/error.response'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
const createCart = async (req, res, next) => {
  const dataCorrection = Joi.object({
    // userId: Joi.string().required().trim().strict(),
    // userId:Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    oldQuantity: Joi.number().required(),
    newQuantity: Joi.number().required()
  })
  try {
    await dataCorrection.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    throw new UnprocessableError("Invalid parameters in create cart !")
  }
}
const updateQuantityCart = async (req, res, next) => {
  const dataCorrection = Joi.object({
    // userId: Joi.string().required().trim().strict(),
    // userId:Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    oldQuantity: Joi.number().required(),
    newQuantity: Joi.number().required()
  })
  try {
    await dataCorrection.validateAsync(req.body, { allowUnknown: true })
    next()
  } catch (error) {
    throw new UnprocessableError("Invalid parameters in updateQuantityCart !")
  }
}
const updateCart = async (req, res, next) => {
  const dataCorrection = Joi.object({
    userId: Joi.string().required().trim().strict(),
    // userId:Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })
  try {
    await dataCorrection.validateAsync(req.body, { allowUnknown: true })
    next()
  } catch (error) {
    throw new UnprocessableError("Invalid parameters in updateQuantityCart !")
  }
}
const getCartByUser = async (req, res, next) => {
  const dataCorrection = Joi.object({
    userId: Joi.string().required().trim().strict(),
    // userId:Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })
  try {
    await dataCorrection.validateAsync(req.body, { allowUnknown: true })
    next()
  } catch (error) {
    throw new UnprocessableError("Invalid parameters in updateQuantityCart !")
  }
}
export const cartValidation = {
  createCart,
  updateQuantityCart,
  updateCart,
  getCartByUser
}