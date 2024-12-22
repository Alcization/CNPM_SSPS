import jwt from "jsonwebtoken"
import { handlerError } from "./handlerError.js"
import { AuthFailureError, NotFoundError, ForbiddenError } from "../cores/error.response.js"
import { keyTokenService } from "~/service/keyStore.service.js"
import { userModel } from "~/model/user.model.js"
import crypto from 'crypto'
import { keyTokenModel } from "~/model/keyToken.model.js"
import { redisService } from "~/service/redis.service.js"
export const createTokenPair = async (payload, publicKey, privateKey) => {
  const accessToken = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1m'
  })

  const refreshToken = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1d'
  })
  return { accessToken, refreshToken }
}
export const verifyJWT = (refreshToken, publicKey) => {
  return jwt.verify(refreshToken, publicKey)
}
export const authentication = handlerError(async (req, res, next) => {
  // check userId 
  const refresh_token = req.cookies["refresh_token"]
  const access_token = req.cookies["access_token"]
  if (!access_token && !refresh_token) {
    throw new AuthFailureError("Unauthorized!")
  }
  let accessToken = access_token
  const { refreshToken } = refresh_token
  if (!refresh_token.userId) throw new AuthFailureError("Invalid request !")


  const KeyName = `Key_Token_${refresh_token.userId}`
  let keyStoreRedis = await redisService.getKey(KeyName)
  //verify refresh token create acces token when expired ones
  if (refreshToken && !accessToken) {
    console.log("vào trong access token expired")

    // find key token via userId
    const keyStore = await keyTokenService.findByUserId(refresh_token.userId)

    if (!keyStore) throw new NotFoundError("Key store is not existing !")

    // verify resfresh token
    const { password, ...decoder } = keyStore.user
    if (refresh_token.userId !== decoder._id.toString()) throw new AuthFailureError("UserId is error !")

    if (keyStore.refreshTokenUsed.includes(refreshToken)) {
      await keyTokenService.deleteByUserId(refresh_token.userId)
      throw new ForbiddenError("Error: Something Wrong , Please relogin ! ")
    }

    if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError("User is not register !")

    const targetUser = await userModel.findOne({ email: decoder.email })
    if (!targetUser) throw new AuthFailureError("User is not register !")

    const userObject = {
      userId: decoder._id,
      email: decoder.email,
      name: decoder.givenName,
      admin: targetUser.admin
    }
    console.log("userObject---------->", userObject)
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
    keyStore.publicKey = publicKey
    await keyTokenModel.findByIdAndUpdate({ _id: keyStore._id }, { $set: { publicKey: publicKey } }, { new: true })
    delete decoder.exp;
    accessToken = jwt.sign(userObject, privateKey, {
      algorithm: 'RS256',
      expiresIn: '1m'
    })
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 60 * 1000,
      sameSite: "None",
      secure: true
    })
    // set public key to redis
    const KeyName = "Key_Token_"
    const userId = decoder._id
    await redisService.setKey(KeyName, userId, publicKey, 60) // dang set laf 60s
    keyStoreRedis = publicKey
  }
  // verify access token
  try {
    const decoder = jwt.verify(accessToken, keyStoreRedis)
    console.log("decoder", decoder)
    if (refresh_token.userId !== decoder.userId) throw new AuthFailureError("UserId is error !")
    req.user = decoder
    // req.keyStore = keyStore
    return (next())
  } catch (error) {
    throw new Error(error)
  }
})

export const checkRoleAdmin = handlerError(async (req, res, next) => {
  if (!req.user.admin) throw new AuthFailureError("User is not Unauthorizated !")
  return (next())
})
