export interface Juego {
  id: number;
  nombre: string;
  anio: number;
  descripcion: string | null;
  desarrollador: string | null;
  precio: number;
  categoria: string | null;
  imagen_url: string | null;
}

export interface FiltrosJuego {
  nombre?: string;
  genero?: string;
  precioMin?: number;
  precioMax?: number;
}
