import { userModel } from "~/model/user.model";
import { otpService } from "./otp.service";
import crypto from 'crypto'
import { keyTokenModel } from "~/model/keyToken.model";
import { AuthFailureError, BadResponseError } from "~/cores/error.response";
import bcrypt from 'bcrypt'
import { keyTokenService } from "./keyStore.service";
import { createTokenPair } from "~/utils/authUtils";
import { userRepo } from "~/model/repositories/user.repo";
import { Types } from "mongoose";
import { redisService } from "./redis.service";

const generateOtp = async (reqBody) => {
  try {
    // check email user da ton tai chua return valid value
    const emailSignUp = reqBody.email
    const isInValidEmail = await userModel.findOne({ email: emailSignUp })
    //check email user
    if (isInValidEmail) {
      throw new BadResponseError('Email đã tồn tại !')
    }
    const otp = await otpService.generateOtp(reqBody)
    return otp
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const verifyOtpSignUp = async (reqBody) => {
  //verify OTP to create User
  const otp = await otpService.verifyOtp(reqBody)
  if (!otp) {
    throw new BadResponseError('Invalid OTP !')
  }
  //adding user
  const newUser = await userRepo.signUp(reqBody)
  return newUser
}
const handlerRefreshToken = async (keyStore, user, refreshToken) => {
  const { email, userId } = user
  //check if refresh token is used
  if (keyStore.refreshTokenUsed.includes(refreshToken)) {
    await keyTokenService.deleteByUserId(userId)
    throw new ForbiddenError("Error: Something Wrong , Please relogin ! ")
  }
  //tao public key va private key
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  })
  //create new access token and refresh token
  const tokens = await createTokenPair(user, publicKey, privateKey)
  await keyTokenModel.updateOne({
    _id: new Types.ObjectId(keyStore._id)
  }, {
    $set: {
      refreshToken: tokens.refreshToken,
      publicKey: publicKey
    },
    $addToSet: {
      refreshTokenUsed: refreshToken
    }
  })
  return {
    user,
    tokens,
    publicKey: publicKey
  }
}
const login = async ({ email, password, refreshToken = null }) => {
  //kiem tra email co ton tai
  const targetUser = await userModel.findOne({ email }).lean()
  if (!targetUser) {
    throw new AuthFailureError("Error: Email is not Exist !")
  }
  //kiem tra mat khau co match hay khong
  const isMatchPassword = await bcrypt.compare(password, targetUser.password)
  if (!isMatchPassword) {
    throw new BadResponseError("Error: PassWord is incorrect !")
  }
  const userObject = { userId: targetUser._id, email: email, admin: targetUser.admin, name: targetUser.givenName };//////////// -> buffer can luu
  const keyStore = await keyTokenModel.findOne({
    user: new Types.ObjectId(userObject.userId)
  }).lean()

  if (keyStore) {
    const result = await handlerRefreshToken(keyStore, userObject, keyStore.refreshToken)
    return {
      metaData: {
        user: {
          _id: targetUser._id,
          name: targetUser.givenName,
          email: targetUser.email,
          admin: targetUser.admin
        },
        tokens: result.tokens,
        publicKey: result.publicKey
      }
    }
  }
  //tao public key va private key
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  })
  //tao 2 access token va refresh token
  const tokens = await createTokenPair(userObject, publicKey, privateKey)
  //luu thay doi va luu refresh token key
  await keyTokenService.createKeyToken({ publicKey: publicKey, userId: targetUser._id, refreshToken: tokens.refreshToken })
  return {
    metaData: {
      user: {
        _id: targetUser._id,
        name: targetUser.givenName,
        email: targetUser.email,
        admin: targetUser.admin
      },
      tokens,
      publicKey: publicKey
    }
  }
}
const updateData = async (reqBody) => {
  try {
    // check email user da ton tai chua return valid value
    const emailUpdated = reqBody.email
    const isInValidEmail = await userModel.findOne({ email: emailUpdated })
    //check email user
    if (!isInValidEmail) {
      throw new BadResponseError("Email không tồn tại !")
    }
    if (reqBody.password !== reqBody.rePassword) {
      throw new BadResponseError("Mật khẩu không trùng khớp !")
    }
    const otp = await otpService.generateOtp(reqBody)
    return otp
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const update = async (reqBody) => {
  //verify OTP to create User
  const otp = await otpService.verifyOtp(reqBody)
  if (!otp) {
    throw new BadResponseError('Invalid OTP !')
  }
  //adding user
  const userUpdate = await userRepo.update(reqBody)
  return userUpdate
}
const logout = async (user) => {
  const keyName = `Key_Token_${user.userId}`
  await redisService.releaseLock(keyName)
  const delKey = await keyTokenService.removeKeyByUserId(user.userId)
  return delKey
}
const getStudentIfo = async (userId) => {
  const result = await userModel.findById(userId).lean()
  return result
}
export const userService = {
  generateOtp,
  login,
  verifyOtpSignUp,
  updateData,
  update,
  logout,
  getStudentIfo
}