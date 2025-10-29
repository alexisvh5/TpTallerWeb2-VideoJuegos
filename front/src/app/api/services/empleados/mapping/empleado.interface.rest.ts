import { Empresa } from "../../../../modules/empresas/interfaces/empresa.interface";

export interface EmpleadoRest {
    id : number,
    nombre : string,
    id_empresa?:number,
    empresa?:Empresa
}