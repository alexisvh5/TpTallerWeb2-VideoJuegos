import { UsuarioRepository } from "../repository/usuario.repository.js";
import bcrypt from "bcryptjs";

export class UsuarioService {

    constructor(private usuarioRepository:UsuarioRepository){}


  // Registro de usuario (Signup)
  async createUsuario(data: {
    nombre: string;
    apellido: string;
    direccion: string;
    email: string;
    contrasenia: string;
  }) {
    // Verificar que no exista el email
    const existente = await this.usuarioRepository.findUsuarioByEmail(data.email);
    if (existente) {
      throw new Error("El email ya está registrado");
    }

    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(data.contrasenia, 10);

    // Crear usuario nuevo
    return await this.usuarioRepository.createUsuario({
      ...data,
      contrasenia: hashedPassword,
    });
  }

  // Login (Signin)
  async login(email: string, contrasenia: string) {
    const usuario = await this.usuarioRepository.findUsuarioByEmail(email);

    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    // Comparar contraseñas
    const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);

    if (!contraseniaValida) {
      throw new Error("Contraseña incorrecta");
    }

    // En este punto podrías generar un token JWT si lo implementan
    return usuario;
  }

  // Listar todos los usuarios (solo para admin o debugging)
  async getAllUsuarios() {
    return await this.usuarioRepository.findAllUsuarios();
  }

  // Buscar usuario por ID
  async getUsuarioById(id: number) {
    const usuario = await this.usuarioRepository.findUsuarioById(id);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
    return usuario;
  }

  // Actualizar datos de usuario
  /*async updateUsuario(
    id: number,
    data: { nombre?: string; apellido?: string; direccion?: string }
  ) {
    const usuario = await this.usuarioRepository.findUsuarioById(id);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    return await this.usuarioRepository.updateUsuario(id, data);
  }

  // Eliminar usuario
  async deleteUsuario(id: number) {
    const usuario = await this.usuarioRepository.findUsuarioById(id);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    return await this.usuarioRepository.deleteUsuario(id);
  }*/
}