import { Empresa } from '../../empresas/interfaces/empresa.interface';

export interface Empleado {
    id:         number;
    nombre:     string;
    id_empresa?: number;
    empresa?:    Empresa;
}

