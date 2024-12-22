
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userModel } from "../user.model"
import { env } from '~/config/environment'
const getAllUsers = async () => {
  const allUsers = await userModel.find({})
  return allUsers
}
const signUp = async (reqBody) => {
  //kiem tra them lan nua
  // const emailSignUp = reqBody.email
  // const isInValidEmail = await User.findOne({ emailSignUp })
  // //check email user
  // if (isInValidEmail) {
  //   return { message: 'Email đã tồn tại !' }
  // }
  //generate hash pasword
  const salt = await bcrypt.genSalt(parseInt(env.SALT))
  const hashPassword = await bcrypt.hash(reqBody.password, salt)
  const { otp, ...data } = reqBody
  const newUser = {
    ...data,
    password: hashPassword
  }
  const userSignUp = await userModel.create(newUser)
  return userSignUp
}
const findOneById = async (id) => {
  const user = await userModel.findOne({ _id: id })
  return user
}
const generateAcessToken = (data) => {
  const token = jwt.sign(data, env.JWT_ACCESS_PRIVATE_KEY, { expiresIn: "1m" })
  return token
}
const generateRefreshToken = (data) => {
  const token = jwt.sign(data, env.JWT_REFRESH_PRIVATE_KEY, { expiresIn: "365d" })
  return token
}
const signIn = async (Data) => {
  try {
    const emailUser = Data.email
    const targetUser = await User.findOne({ email: emailUser })
    if (!targetUser) {
      return { message: "Email is not Exist !" }
    }
    const isValidPassword = await bcrypt.compare(Data.password, targetUser.password)
    if (!isValidPassword) {
      return { message: "Password is incorrect !" }
    }
    const access_token = generateAcessToken({ id: targetUser._id })
    const refresh_token = generateRefreshToken({ id: targetUser._id })
    return { ...targetUser, access_token: access_token, refresh_token: refresh_token }
  } catch (error) {
    throw new Error(error)
  }
}
const getUserFreshToken = async (cookie) => {
  try {
    const cookieVarified = jwt.verify(cookie, env.JWT_REFRESH_PRIVATE_KEY)
    if (!cookieVarified) {
      return { message: "token is undefined" }
    }
    const idCookieVarified = cookieVarified.id
    const userVarified = await userModel.findOne({ _id: idCookieVarified })
    if (!userVarified) {
      return { message: "User is NOT FOUND" }
    }

    const { password, ...dataUser } = userVarified
    return dataUser
  } catch (error) {
    throw new Error(error)
  }
}
const getUser = async (cookie) => {
  try {
    const cookieVarified = jwt.verify(cookie, env.JWT_ACCESS_PRIVATE_KEY)
    if (!cookieVarified) {
      return { message: "token is undefined" }
    }
    const idCookieVarified = cookieVarified.id
    const userVarified = await userModel.findOne({ _id: idCookieVarified })
    if (!userVarified) {
      return { message: "User is NOT FOUND" }
    }

    const { password, ...dataUser } = userVarified
    return dataUser
  } catch (error) {
    throw new Error(error)
  }
}
const update = async (reqBody) => {
  try {
    //kiem tra them lan nua
    const emailUpdate = reqBody.email
    //generate hash pasword
    const salt = await bcrypt.genSalt(parseInt(env.SALT))
    const hashPassword = await bcrypt.hash(reqBody.password, salt)
    const userUpdate = await userModel.findOneAndUpdate({ email: emailUpdate }, { password: hashPassword }, { new: true })
    const { password, ...data } = userUpdate
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export const userRepo = {
  getAllUsers, findOneById, signUp,
  generateAcessToken, signIn,
  getUser,
  update,
  getUserFreshToken,

}