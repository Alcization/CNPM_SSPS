import Joi from 'joi'
import { UnprocessableError } from '~/cores/error.response'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
const orderByUser = async (req, res, next) => {
  const dataCorrection = Joi.object({
    // userId: Joi.string().required().trim().strict(),
    cartId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    price: Joi.number().required(),
    language: Joi.string().valid('vn', 'en').required(),
  })
  try {
    await dataCorrection.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    throw new UnprocessableError("Invalid parameters in create cart !")
  }
}
const getOrdersByUser = async (req, res, next) => {
  const dataCorrection = Joi.object({
    // userId: Joi.string().required().trim().strict(),
    userId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  })
  try {
    await dataCorrection.validateAsync(req.body, { allowUnknown: true })
    next()
  } catch (error) {
    throw new UnprocessableError("Invalid parameters in getOrdersByUser !")
  }
}
const getOrderById = async (req, res, next) => {
  const dataCorrection = Joi.object({
    orderId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })
  try {
    await dataCorrection.validateAsync(req.body, { allowUnknown: true })
    next()
  } catch (error) {
    throw new UnprocessableError("Invalid parameters in getOrderById !")
  }
}
export const orderValidation = {
  orderByUser,
  getOrdersByUser,
  getOrderById,

}