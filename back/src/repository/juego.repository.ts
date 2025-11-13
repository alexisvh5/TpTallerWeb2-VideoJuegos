import { prisma } from "../prisma.js";

export class JuegoRepository {
  async findAllJuegos() {
    return await prisma.juego.findMany();
  }

  async findJuegoById(id: number) {
    return await prisma.juego.findUnique({
      where: { id },
    });
  }

  async findJuegoByNombre(nombre: string) {
    return await prisma.juego.findMany({
      where: { nombre: nombre },
    });
  }

  async getJuegosPorGenero(genero: string) {
  return await prisma.juego.findMany({
    where: {
      JuegoGenero: {
        some: {
          Genero: {
            nombre: genero,
          },
        },
      },
    },
    select: {
      id: true,
      nombre: true,
      anio: true,
      descripcion: true,
      desarrollador: true,
      precio: true,
      categoria: true,
      imagen_url: true,
      JuegoGenero: {
        include: {
          Genero: true,
        },
      },
    },
  });
}

  async getJuegosNuevos() {
    const anioActual = new Date().getFullYear();
    
    return await prisma.juego.findMany({
      where: {
        anio: anioActual,
      },
    });
  }

  async agregarJuego(data: {nombre:string, anio:number, descripcion:string, desarrollador:string, precio:number}){
    return await prisma.juego.create({data});
  }

  async eliminarJuego(id:number){
    return await prisma.juego.delete({
      where:{id}
    })
  }

  async modificarJuego(id:number, data: {nombre?:string, anio?:number, descripcion?:string, desarrollador?:string, precio?:number, imagen_url?:string, categoria?:string}){
  return await prisma.juego.update({
    where:{id},
    data
  })
}
}
