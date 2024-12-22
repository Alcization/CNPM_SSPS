
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// import uploadRouter from "~/route/upload.Route.js";
import { instanceMongoDb } from './config/connection.js'
import { env } from './config/environment.js';
import Router from './route/index.js';
import cookieParser from "cookie-parser"
import cors from 'cors'
import bodyParser from 'body-parser'
// Setup __dirname for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
import { corsOptions } from './config/cors.js';
const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.raw({ type: "*/*" }));
app.use(cors(corsOptions))
const port = process.env.PORT || 3000;
app.use('/v1', Router);
app.use((req, res, next) => {
  const error = new Error("Not Found")
  error.status = 404
  next(error)
})
app.use((err, req, res, next) => {
  const statusCode = err.status || 500
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    stack: err.stack,
    message: err.message || 'Interval Server Error'
  })
})
// muon dug thif mor type thnah module
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'));  // Ensure the correct path is used
// });

const start = async () => {
  try {
    await instanceMongoDb

    app.listen(env.PORT, () => {
      console.log(`Example app listening on ${env.HOST_URL}`)
      // console.log(`Server is live on ${env.PORT}`)
    })
  }
  catch (error) {
    console.log(error);
  }
}
start();





// import { messageService } from './service/message.service.js'
// const queueName = 'order-queue-message'

// // messageService.consumerToQueue(queueName).then(() => {
// //   console.log(`Message started at ${queueName}`)
// // }).catch((error) => console.log(error))

// // messageService.consumerSuccessMessage(queueName).then(() => {
// //   console.log(`Message successful started at ${queueName}`)
// // }).catch((error) => console.log(error))

// // messageService.consumerFaliedMessage(queueName).then(() => {
// //   console.log(`Message failed started at ${queueName}`)
// // }).catch((error) => console.log(error))


// messageService.orderQueueMessage(queueName).then(() => {
//   console.log(`Message started at ${queueName}`)
// }).catch((error) => console.log(error))
