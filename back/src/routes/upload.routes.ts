// src/routes/upload.routes.ts
import { Router } from 'express';
import multer from 'multer';
import path from 'path'; // Necesitas 'path' para resolver las rutas
import { UploadController } from '../controllers/upload.controller.js';

const router = Router();
const uploadController = new UploadController();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Asegúrate de que esta ruta sea correcta y exista en tu servidor
    cb(null, path.join(process.cwd(), 'public', 'images', 'uploads')); 
  },
  filename: (req, file, cb) => {
    // Para evitar nombres de archivo duplicados, añade un timestamp
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Filtro para aceptar solo imágenes
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Aceptar archivo
  } else {
    cb(new Error('Tipo de archivo no soportado. Solo se permiten imágenes.'), false); // Rechazar archivo
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB
});

// Ruta para subir una sola imagen
router.post('/upload', upload.single('imagen'), uploadController.uploadImage);

export default router;