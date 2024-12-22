import express from 'express'
import { upload } from '../config/multer.js';
import { uploadController } from '../controller/upload.controller.js';
const uploadRouter = express.Router();

uploadRouter.post('/upload', upload.single('file'), uploadController.postfile);
uploadRouter.get('/filename', uploadController.getfile);
// router.delete('/:filename', fileController.deleteFile);

export default uploadRouter