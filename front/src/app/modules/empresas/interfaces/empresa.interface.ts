import { Empleado } from "../../empleados/interfaces/empleado.interface";

export interface Empresa {
    id:       number;
    nombre:   string;
    empleados: Empleado[];
}

