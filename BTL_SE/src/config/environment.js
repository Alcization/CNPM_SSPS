import 'dotenv/config'

export const env = {
  URI_RABBITMQ: process.env.URI_RABBITMQ,
  URI_DATABASE: process.env.URI_DATABASE,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  HOST_URL: process.env.HOST_URL,
  VNP_TMNCODE: process.env.VNP_TMNCODE,
  VNP_HASHSECRET: process.env.VNP_HASHSECRET,
  VNP_URL: process.env.VNP_URL,
  VNP_API: process.env.VNP_API,
  VNP_RETURNURL: process.env.VNP_RETURNURL,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  SALT: process.env.SALT,
  URL_REDIS: process.env.URL_REDIS
}