import { messageRepo } from "../model/repositories/message.repo.js"
export const messageService = {

  async consumerToQueue(queueName) {
    try {
      const { channel, connection } = await messageRepo.connectToRabbitMq()
      console.log(queueName)
      await messageRepo.consumerRabbiMQ(channel, queueName)
    } catch (error) {
      throw new Error(error)
    }
  },

  async consumerSuccessMessage(queueName) {
    try {
      const { channel, connection } = await messageRepo.connectToRabbitMq()
      await messageRepo.consumerSuccessMessage(channel, queueName)
    } catch (error) {
      throw new Error(error)
    }
  },
  async consumerFaliedMessage(queueName) {
    try {
      const { channel, connection } = await messageRepo.connectToRabbitMq()
      await messageRepo.consumerFailedMessage(channel, queueName)
    } catch (error) {
      throw new Error(error)
    }
  },
  async orderQueueMessage(queueName) {
    try {
      const { channel, connection } = await messageRepo.connectToRabbitMq()
      await messageRepo.orderQueueMessage(channel, queueName)
    } catch (error) {
      throw new Error(error)
    }
  }
}