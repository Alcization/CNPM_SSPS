//src/middleware/upload.middleware.js

import multer from 'multer'

import { cloudinary, storage } from '~/config/cloudinary.config.js';
import { BadRequestError } from '../cores/error.response.js'

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'text/plain') {
    cb(null, true)
  } else {
    cb(new BadRequestError('Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.'), false)
  }
}

export const uploadMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB 
  }
}).single('documentFile')

// Function xóa file khỏi cloud
export const deleteFileFromCloud = async (fileUrl) => {
  try {
    const publicId = fileUrl.split('/').slice(-1)[0].split('.')[0]
    const result = await cloudinary.uploader.destroy(`documents/${publicId}`, { resource_type: 'raw' })
    return result.result === 'ok'
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error)
    return false
  }
} 