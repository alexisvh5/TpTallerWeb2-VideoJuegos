import { type Request, type Response } from "express";
import { UsuarioRepository } from "../repository/usuario.repository.js";
import { UsuarioService } from "../services/usuario.service.js";

const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);

export class UsuarioController {
  
  // Registrar usuario (Signup)
  async signup(req: Request, res: Response) {
    try {
      const nuevoUsuario = await usuarioService.createUsuario(req.body);
      res.status(201).json({ mensaje: "Usuario registrado correctamente", usuario: nuevoUsuario });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
      console.log('no se pudio' + error);
    }
  }

  // Login
  async login(req: Request, res: Response) {
    try {
      const { email, contrasenia } = req.body;
      const usuario = await usuarioService.login(email, contrasenia);
      res.status(200).json({ mensaje: "Inicio de sesión exitoso", usuario });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener todos los usuarios (opcional)
  async getAll(req: Request, res: Response) {
    try {
      const usuarios = await usuarioService.getAllUsuarios();
      res.status(200).json(usuarios);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
