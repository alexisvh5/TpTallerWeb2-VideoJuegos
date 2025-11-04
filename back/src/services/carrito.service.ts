import { CarritoRepository } from "../repository/carrito.repository.js";

export class CarritoService {

      constructor(private carritoRepository:CarritoRepository){}
  
  async obtenerCarrito(idUsuario: number) {
    return await this.carritoRepository.getCarritoByUsuario(idUsuario);
  }

  async agregarJuegoAlCarrito(idUsuario: number, idJuego: number) {
    return await this.carritoRepository.agregarJuego(idUsuario, idJuego);
  }

  async eliminarJuegoDelCarrito(idUsuario: number, idJuego: number) {
    return await this.carritoRepository.eliminarJuego(idUsuario, idJuego);
  }

  async vaciarCarrito(idUsuario: number) {
    return await this.carritoRepository.vaciarCarrito(idUsuario);
  }
}
