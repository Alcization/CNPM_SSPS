// import { messageRepo } from './model/repositories/message.repo.js'

// const consumerRabbitMQ = async () => {
//   try {
//     const { channel, connection } = await messageRepo.connectToRabbitMq();
//     if (!channel) {
//       console.error("No channel available");
//       return;
//     }
//     const queue = 'topic';
//     await channel.assertQueue('topic', { durable: true })
//     channel.consume(queue, (message) => {
//       console.log(`Recieved message :: ${message.content.toString()}`)
//     }, { noAck: true });
//   } catch (error) {
//     console.error('Failed to consume messages from RabbitMQ', error);
//     throw new Error(error);
//   }
// };

// consumerRabbitMQ().catch(console.error);

import { messageRepo } from './model/repositories/message.repo.js'
// const connectionToRabbitMqToTest = async () => {
//   try {

//     const { channel, connection } = await messageRepo.connectToRabbitMq()
//     const queue = 'topic'
//     const message = "hello , this is a test for rabbitmq !"
//     await channel.assertQueue(queue, {
//       durable: true
//     })
//     await channel.sendToQueue(queue, Buffer.from(message))
//     console.log(message)

//   } catch (error) {
//     throw new Error(error)
//   }
// }
// const runProducer = async () => {
//   try {
//     const msg = 'a new product'
//     const { channel, connection } = await messageRepo.connectToRabbitMq()
//     const notificationExchange = 'notificationExchange'
//     const notificationExDLX = 'notificationExDLX'
//     const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX'
//     const notiQueue = 'notificationQueueProcess'
//     //1 create exchange
//     await channel.assertExchange(notificationExchange, 'direct', {
//       durable: true
//     })
//     // assert queue
//     const result = await channel.assertQueue(notiQueue, {
//       exclusive: false,
//       deadLetterExchange: notificationExDLX,
//       deadLetterRoutingKey: notificationRoutingKeyDLX
//     })

//     // binding queue
//     await channel.bindQueue(result.queue, notificationExchange)

//     console.log('Producer with message:: ', msg)
//     // push message to  queue
//     await channel.sendToQueue(result.queue, Buffer.from(msg), {
//       expiration: '10000'
//     })

//     setTimeout(() => {
//       connection.close()
//       process.exit(0)
//     }, 500)
//   } catch (error) {
//     throw new Error(error)
//   }
// }
const runProducer = async () => {
  try {
    const { channel, connection } = await messageRepo.connectToRabbitMq()
    const queueName = 'order-queue-message'
    //1 create exchange

    // assert queue
    const result = await channel.assertQueue(queueName, {
      durable: true
    })

    for (let i = 0; i < 4; i++) {
      const message = `ordered-queue-message ${i}`
      console.log(message)
      channel.sendToQueue(queueName, Buffer.from(message))
    }
    setTimeout(() => {
      connection.close()
    }, 1000)
  } catch (error) {
    throw new Error(error)
  }
}
runProducer().catch(console.error)