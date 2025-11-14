// src/controllers/upload.controller.ts
import {type Request,type Response } from 'express';

export class UploadController {
  async uploadImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No se subió ningún archivo.' });
      }

      // req.file contiene la información del archivo subido por Multer
      // path: la ruta donde Multer guardó el archivo en el servidor
      // La ruta que guardamos en la BD será relativa a 'public'
      const imageUrl = `/images/uploads/${req.file.filename}`; 

      // Aquí podrías guardar 'imageUrl' en la base de datos si quisieras
      // directamente al subirla, o devolverla al frontend para que lo haga.
      
      res.status(200).json({ 
        message: 'Imagen subida exitosamente.', 
        filename: req.file.filename,
        imageUrl: imageUrl // Esta es la URL relativa que se guardaría en la BD
      });

    } catch (error: any) {
      console.error('Error al subir imagen:', error);
      res.status(500).json({ message: 'Error interno del servidor al subir la imagen.', error: error.message });
    }
  }
}