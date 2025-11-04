import type { JuegoRepository } from "../repository/juego.repository.js";

export class JuegoService {
  constructor(private juegoRepository: JuegoRepository) {}

  async getAllJuegos() {
    return await this.juegoRepository.findAllJuegos();
  }

  async getJuegoById(id: number) {
    const juego = await this.juegoRepository.findJuegoById(id);
    if (!juego) {
      throw new Error("Juego no encontrado");
    }
    return juego;
  }

  async getJuegosPorGenero(genero:string) {
    return await this.juegoRepository.getJuegosPorGenero(genero);
  }
  
  async getJuegosNuevos(){
    return await this.juegoRepository.getJuegosNuevos();
  }

}
