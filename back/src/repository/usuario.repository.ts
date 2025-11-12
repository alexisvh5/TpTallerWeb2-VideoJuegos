import { prisma } from "../prisma.js";


export class UsuarioRepository{        
  

  async createUsuario(data: { nombre: string; apellido: string; direccion: string; email: string; contrasenia: string }) {
    return await prisma.usuario.create({ data });
  }

  async findAllUsuarios() {
    return await prisma.usuario.findMany({
      select: { id: true, nombre: true, apellido: true, email: true, direccion: true, rol: true },
    });
  }

  async findUsuarioById(id: number) {
    return await prisma.usuario.findUnique({
      where: { id },
    });
  }

  async findUsuarioByEmail(email: string) {
    return await prisma.usuario.findUnique({
      where: { email },
    });
  }

  async updatePasswordUsuario(id: number, newPassword: string) {
    return await prisma.usuario.update({
      where: { id },
      data: { contrasenia: newPassword },
    });
  }

}