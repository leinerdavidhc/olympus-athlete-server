import { v2 as cloudinary } from 'cloudinary';
import { API_KEY, API_SECRET, Cloud_NAME } from '../config';

// Configura Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: Cloud_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true // Para usar HTTPS
});

export default cloudinary;
