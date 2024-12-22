import amqp from 'amqplib'

const connectToRabbitMq = async () => {
  try {
    const connection = await amqp.connect('amqp://guest:12345@localhost')
    if (!connection) throw new Error("Connection not established !")

    const channel = await connection.createChannel()
    return { channel, connection }
  } catch (error) {
    throw new Error(error)
  }
}
const RabbitMqToTest = async () => {
  try {

    const { channel, connection } = await connectToRabbitMq()


    const queue = 'test-topic'
    const message = "hello , this is a test for rabbitmq !"
    await channel.assertQueue(queue, {
      durable: true
    })
    channel.sendToQueue(queue, Buffer.from(message))
    console.log(message)
    await connection.close()

  } catch (error) {
    throw new Error(error)
  }
}


const consumerRabbiMQ = async (channel, queueName) => {
  try {
    await channel.assertQueue(queueName, {
      durable: true
    })
    channel.consume(queueName, (message) => {
      console.log(`Recieved message from ${queueName}:: ${message.content.toString()}`)
    }, {
      noAck: true
    })
  } catch (error) {
    throw new Error(error)
  }
}

const consumerSuccessMessage = async (channel, queueName) => {
  try {
    const notiQueue = 'notificationQueueProcess'

    // const timeExpired = 15000
    // setTimeout(() => {
    //   channel.consume(notiQueue, (message) => {
    //     console.log(`Recieved message successfully :: ${message.content.toString()}`)
    //     channel.ack(message)
    //   })
    // }, timeExpired)
    channel.consume(notiQueue, (msg) => {
      try {
        const randomcode = Math.random()
        console.log("randomcode 1:: ", randomcode)
        if (randomcode < 0.8) {
          throw new Error("Send notification failed:: HOT FIX")
        }
        console.log('Send notification sucessfully::', msg.content.toString())
        channel.ack(msg)
      } catch (error) {
        channel.nack(msg, false, false)
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}
let retryCount = 2
const consumerFailedMessage = async (channel, queueName) => {
  try {
    const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX'
    const notificationExDLX = 'notificationExDLX'
    const notiQueueHandler = 'notiQueueHandler'
    //1 create exchange
    await channel.assertExchange(notificationExDLX, 'direct', {
      durable: true
    })
    // assert queue
    const result = await channel.assertQueue(notiQueueHandler, {
      exclusive: false
    })


    // binding queue
    await channel.bindQueue(result.queue, notificationExDLX, notificationRoutingKeyDLX)
    // push message to  queue
    await channel.consume(result.queue, message => {
      // console.log('Recieved message failed plss hot fix :: ', message.content.toString())

      try {
        const randomcode = 0.9
        console.log(`randomcode ${retryCount}:: `, randomcode)
        if (randomcode < 0.8) {
          throw new Error(`Send notification failed ${retryCount} times :: HOT FIX`)
        }
        console.log(`Recieved message failed plss hot fix  time::${retryCount} times `, message.content.toString())
        channel.ack(message)
      } catch (error) {
        retryCount += 1
        //check if retry 4 times will kill task
        if (retryCount === 4) {
          channel.cancel(result.queue)
          console.log("Max retry count reached. Task killed.");
          return;
        }
        channel.nack(message, false, true)
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

const orderQueueMessage = async (channel, queueName) => {
  try {

    await channel.assertQueue(queueName, {
      durable: true
    })
    // use prefetch like a mutex in os, just only 1 task can run in a time
    channel.prefetch(1)
    channel.consume(queueName, (msg) => {
      setTimeout(() => {
        const message = msg.content.toString()
        console.log('process:', message)
        channel.ack(msg)
      }, Math.random() * 1000)
    })

  } catch (error) {
    throw new Error(error)
  }
}
export const messageRepo = {
  connectToRabbitMq,
  RabbitMqToTest,
  consumerRabbiMQ,
  consumerSuccessMessage,
  consumerFailedMessage,
  orderQueueMessage
}