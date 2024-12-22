import { promisify } from "util"
import { BadResponseError } from "../cores/error.response.js"
import { connectRedis, startRedis } from "~/utils/helper.js"

// const pexpireAsync = promisify(redisClient.pExpire).bind(redisClient)
// const setAsync = promisify(redisClient.setNX).bind(redisClient)

const acquireLock = async (productId, quantity, cartId) => {
  const key = `key2024${productId}`
  const expireTime = 3000 + Math.random() * 1000 // set <> 3000 random time 
  const retryTime = 10
  for (let i = 0; i < retryTime; i++) {
    const result = await redisClient.setNX(key, `${expireTime}`)
    if (result) {
      // update quantity in product inventory
      const reservationUpdate = await inventoryRepo.reservationInventory({ productId, quantity, cartId })
      if (reservationUpdate.modifiedCount) {
        await redisClient.pExpire(key, expireTime)
        return key
      }
      return null

    } else {
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
  }
}
const setKey = async (name, id, value, ttl) => {
  const redisClient = await connectRedis()
  const keyName = name + id
  return await redisClient.set(keyName, value, {
    EX: ttl, // expire trong 30 s,
    NX: true
  })
}
const getKey = async (keyName) => {
  const redisClient = await connectRedis()
  return await redisClient.get(keyName)
}
const releaseLock = async (keylock) => {
  const redisClient = await connectRedis()
  // const delKey = promisify(redisClient.del).bind(redisClient)
  return await redisClient.del(keylock)
}
const incrRateLimit = async (key) => {
  const redisClient = await connectRedis()
  return await redisClient.incr(key)
}
const expireLock = async (key, ttl) => {
  const redisClient = await connectRedis()
  return await redisClient.expire(key, ttl)
}
const scanKey = async (cursor, pattern) => {
  const redisClient = await connectRedis()
  return await redisClient.scan(cursor, 'MATCH', pattern)
}
const createHash = async (hashKey, hashData) => {
  const redisClient = await connectRedis(); // Kết nối Redis

  // Lưu dữ liệu vào Redis dưới dạng hash
  const result = await redisClient.hSet(hashKey, Object.entries(hashData).flat());
  await redisClient.expire(hashKey, 60 * 60);

  return result; // Trả về kết quả của việc lưu trữ
};
const incryHash = async (hashKey, hashDataCount) => {
  const redisClient = await connectRedis(); // Kết nối Redis

  // Lưu dữ liệu vào Redis dưới dạng hash
  const result = await redisClient.hIncrBy(hashKey, "cart_quantity_pages", hashDataCount);

  return result; // Trả về kết quả của việc lưu trữ
};
const getHash = async (hashKey, field) => {
  const redisClient = await connectRedis(); // Kết nối Redis

  // Lưu dữ liệu vào Redis dưới dạng hash
  // const result = await redisClient.hGetAll(hashKey);
  const result = await redisClient.hGet(hashKey, field);
  return result; // Trả về kết quả của việc lưu trữ
};
export const redisService = {
  acquireLock,
  releaseLock,
  incrRateLimit,
  expireLock,
  setKey, getKey,
  scanKey,
  createHash,
  incryHash,
  getHash
}