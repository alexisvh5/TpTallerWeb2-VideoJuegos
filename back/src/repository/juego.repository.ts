import { prisma } from "../prisma.js";

export class JuegoRepository {
  async findAllJuegos( { where } ) {
    return await prisma.juego.findMany( { where , orderBy: { nombre: 'asc' } });
  }

  async findJuegoById(id: number) {
    return await prisma.juego.findUnique({
      where: { id },
    });
  }

  async getGeneros() {
    const generos = await prisma.juego.findMany({
        where: {
          categoria: {
            not: null,
          },
        },
        select: {
          categoria: true,
        },
        distinct: ['categoria'],
      });

    const generosUnicos = generos
      .map(j => j.categoria)
      .filter(Boolean) as string[];

    return generosUnicos;
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

  async agregarJuego(data: {nombre:string, anio:number, descripcion:string, desarrollador:string, precio:number,categoria:string,imagen_url:string}){
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
