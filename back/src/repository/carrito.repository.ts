import { prisma } from "../prisma.js";

export class CarritoRepository {
  async getCarritoByUsuario(idUsuario: number) {
    return await prisma.carrito.findUnique({
      where: { idUsuario },
      include: { CarritoJuego: { include: { Juego: true } } },
    });
  }

  async agregarJuego(idUsuario: number, idJuego: number) {
    const carrito = await prisma.carrito.findUnique({ where: { idUsuario } });
    if (!carrito) throw new Error("Carrito no encontrado");

    return await prisma.carritoJuego.create({
      data: {
        A: carrito.id, // campo FK de carrito
        B: idJuego,    // campo FK de juego
      },
    });
  }

  async eliminarJuego(idUsuario: number, idJuego: number) {
    const carrito = await prisma.carrito.findUnique({ where: { idUsuario } });
    if (!carrito) throw new Error("Carrito no encontrado");

    return await prisma.carritoJuego.delete({
      where: {
        A_B: { A: carrito.id, B: idJuego }, // clave compuesta
      },
    });
  }

  async vaciarCarrito(idUsuario: number) {
    const carrito = await prisma.carrito.findUnique({ where: { idUsuario } });
    if (!carrito) throw new Error("Carrito no encontrado");

    return await prisma.carritoJuego.deleteMany({
      where: { A: carrito.id },
    });
  }
}
