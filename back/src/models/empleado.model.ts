import type { Empresa } from "./empresa.model.js";

export class Empleado {
  id: number;
  nombre: string;
  id_empresa: number;
  empresa: Empresa;
  sueldo:number
}
