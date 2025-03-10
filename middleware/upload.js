import { cloudinary } from '../config/cloudinary.js';
import multer from 'multer'; 
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'products', 
      allowed_formats: ['jpg', 'jpeg', 'png'], 
    },
});

const upload = multer({ storage });

export default upload;
