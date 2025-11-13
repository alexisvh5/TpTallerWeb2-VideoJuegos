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

  async agregarJuego(data: {
      id:number,
      nombre:string,
      anio:number,
      descripcion:string,
      desarrollador:string,
      precio:number,
      categoria:string,
      imagen_url:string
    }) {
      // Verificar que no exista el nombre
      const existente = await this.juegoRepository.findJuegoByNombre(data.nombre);
      if (existente.length > 0) {
        throw new Error("Ya existe un juego con el mismo nombre o parecido. Intente con otro nombre.");
      }
  
      // Crear juego nuevo
      return await this.juegoRepository.agregarJuego({
        ...data
      });
    }

    async eliminarJuego(id:number){
      const juego = await this.juegoRepository.findJuegoById(id);
      if(!juego){
        throw new Error("Juego no encontrado por ID");
      }
      return await this.juegoRepository.eliminarJuego(id);
    }

    async modificarJuego(id:number, data) {
      const juego = this.juegoRepository.findJuegoById(id);
      if(!juego){
        throw new Error("Juego no encontrado por ID");
      }

      return await this.juegoRepository.modificarJuego(id, data)
    }

}
