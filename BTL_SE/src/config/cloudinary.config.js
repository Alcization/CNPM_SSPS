//src/config/cloudinary/config.js

import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'documents', // Folder trong cloudinary
    resource_type: 'raw',
    allowed_formats: ['pdf', 'doc', 'docx', 'txt']
  }
});

export { cloudinary };