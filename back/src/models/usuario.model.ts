export class Usuario {
  id?: number;              // opcional, autogenerado en la BD
  nombre: string;
  apellido: string;
  direccion: string;
  email: string;
  contrasenia: string;

  // Relaciones opcionales (si las necesitás en el front o servicios)
  carrito?: any;             // podés tiparlo si tenés un modelo Carrito
  compras?: any[];           // idem para Compra[]
}
