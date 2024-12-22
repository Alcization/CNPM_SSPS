
import { userService } from '~/service/user.service.js'
import { userModel } from '~/model/user.model.js'
import { CreatedResponse, OKReponse } from "../cores/sucess.response.js";
import { redisService } from '~/service/redis.service.js'


const signUp = async (req, res, next) => {
  // const docRef = await addDoc(collection(db, "users"), req.body);
  const newUser = await userService.generateOtp(req.body);
  new CreatedResponse({
    message: "Dang ky user !",
    metaData: newUser
  }).send(res)
}
const verifyOtpSignUp = async (req, res, next) => {
  const newUser = await userService.verifyOtpSignUp(req.body)
  new CreatedResponse({
    message: "Tao user thanh cong !",
    metaData: newUser
  }).send(res)
}
const login = async (req, res, next) => {
  const loginUser = await userService.login(req.body);
  console.log("loginUser----------", loginUser)

  // set public key to redis
  const KeyName = "Key_Token_"
  const userId = loginUser.metaData.user._id
  await redisService.setKey(KeyName, userId, loginUser.metaData.publicKey, 60) // dang set laf 60s
  const refreshToken = {
    refreshToken: loginUser.metaData.tokens.refreshToken,
    userId: loginUser.metaData.user._id
  }
  res.cookie("access_token", loginUser.metaData.tokens.accessToken, {
    httpOnly: true,
    maxAge: 60 * 1000,
    sameSite: "None",
    secure: true
  })
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 ngay
    sameSite: "None",
    secure: true
  })
  const result = loginUser.metaData.user
  new OKReponse({
    message: "Login user thanh cong !",
    metaData: result
  }).send(res)

}
const getUser = async (req, res, next) => {
  const { userId } = req.user
  // const result = await userModel.findById(userId, '-password')
  const result = req.user
  new OKReponse({
    message: "Get user thanh cong !",
    metaData: result
  }).send(res)
}
const authMiddleware = async (req, res, next) => {
  try {
    const cookie = req.body.access_token
    const resfresh_cookie = req.body.refresh_token
    if (!cookie && !resfresh_cookie) {
      res.status(201).json(null)
    }
    else if (!cookie) {
      const cookieVarified = await userModel.getUserFreshToken(resfresh_cookie)
        .then(async (results) => {
          const access_token = await userModel.generateAcessToken({ id: results._doc._id })
          res.cookie("access_token", access_token, {
            httpOnly: true,
            maxAge: 60 * 1000,
            sameSite: "None",
            secure: true
          })
          return access_token
        })
      const User = await userService.getUser(cookieVarified)
      const { password, ...dataUser } = User._doc
      res.status(200).json(dataUser)
    }
    else {
      const targetUser = await userService.getUser(cookie)
      const { password, ...dataUser } = targetUser._doc
      res.status(200).json(dataUser)
    }

  } catch (e) {
    res.cookie("acess_token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(1)
    })
    console.error("Error adding document: ", e);
  }
}
const logOut = async (req, res, next) => {

  const result = await userService.logout(req.user)
  res.cookie("access_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(1)
  });
  res.cookie("refresh_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(1)
  });
  new OKReponse({
    message: "logout success!",
    metaData: result
  }).send(res)

  // res.status(200).json({ message: "logout success" })

}
const update = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newUser = await userService.update(req.body);
    //sau khi doi mat khau thi log out de dang nhap lai
    res.cookie("access_token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(1)
    });
    res.cookie("refresh_token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(1)
    });
    res.status(201).send(newUser)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const updateData = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const checkEmail = await userService.updateData(req.body);
    res.status(201).send(checkEmail)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const getInfoStudent = async (req, res, next) => {
  const { userId } = req.user
  // const result = await userModel.findById(userId, '-password')

  const result = await userService.getStudentIfo(userId)
  new OKReponse({
    message: "Get info student thanh cong !",
    metaData: result
  }).send(res)
}
export const userController = {
  signUp,
  login,
  getUser,
  logOut,
  verifyOtpSignUp,
  update, updateData,
  authMiddleware,
  getInfoStudent
}