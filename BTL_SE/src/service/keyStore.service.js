import { keyTokenModel } from "~/model/keyToken.model";
import { Types } from "mongoose";

const createKeyToken = async ({ userId, publicKey, refreshToken }) => {
  try {
    const filter = { user: userId }, update = { publicKey: publicKey, refreshTokenUsed: [], refreshToken }, option = { upsert: true, new: true }
    const tokens = await keyTokenModel.findOneAndUpdate(filter, update, option)
    return tokens ? tokens.publicKey : null
  } catch (error) {
    throw new Error(error)
  }
}

const findByUserId = async (userId) => {
  const targetKey = await keyTokenModel.findOne({ user: userId }).populate('user', '_id email givenName').lean()
  return targetKey
}
const removeKeyById = async (id) => {
  return await keyTokenModel.deleteOne(id)
}
const removeKeyByUserId = async (userId) => {
  return await keyTokenModel.deleteOne({ user: new Types.ObjectId(userId) })
}
const findByRefreshTokenUsed = async (refreshToken) => {
  const targetKey = await keyTokenModel.findOne({ refreshTokenUsed: refreshToken })
  return targetKey
}
const deleteByUserId = async (userId) => {
  const targetKey = await keyTokenModel.deleteOne({ user: userId })
  return targetKey
}
const findByRefreshToken = async (refreshToken) => {
  const targetKey = await keyTokenModel.findOne({ refreshToken: refreshToken })
  return targetKey
}

export const keyTokenService = {
  createKeyToken,
  findByUserId,
  findByRefreshToken,
  deleteByUserId,
  removeKeyById,
  findByRefreshTokenUsed,
  removeKeyByUserId
}