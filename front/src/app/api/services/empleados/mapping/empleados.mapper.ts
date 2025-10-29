import { Empleado } from "../../../../modules/empleados/interfaces/empleado.interface";
import { EmpleadoRest } from "./empleado.interface.rest";

export class EmpleadoMapper {

    static mapRestEmpleadoToEmpleado(empleadoRest:EmpleadoRest):Empleado{
        return {
            id : empleadoRest.id,
            nombre : empleadoRest.nombre,
            id_empresa : empleadoRest.id_empresa,
            empresa : empleadoRest.empresa 
        }
    }

    static mapRestEmpleadoArrayToEmpleadoArray(empleadosRest:EmpleadoRest[]): Empleado[]{
        return empleadosRest.map(this.mapRestEmpleadoToEmpleado);
    }

}