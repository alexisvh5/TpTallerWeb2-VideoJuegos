import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Empleado } from '../../../modules/empleados/interfaces/empleado.interface';
import { map, Observable, throwError } from 'rxjs';
import { EmpleadoMapper } from './mapping/empleados.mapper';
import { EmpleadoRest } from './mapping/empleado.interface.rest';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  http = inject(HttpClient);

  constructor() {}

  listEmpleados(): Observable<Empleado[]> {
    return this.http.get<EmpleadoRest[]>(`${environment.api_url}/empleado/`).pipe(
      map((res)=>{
        return EmpleadoMapper.mapRestEmpleadoArrayToEmpleadoArray(res)
      })
    )
  }

  eliminarEmpleado(empleado: Empleado) {
    return this.http.delete(`${environment.api_url}/empleado/${empleado.id}`);
  }

  verEmpleado(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${environment.api_url}/empleado/${id}`);
  }

  createEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(`${environment.api_url}/empleado/`, empleado);
  }

  updateEmpleado(empleado: Empleado) {
    return this.http.put<Empleado>(`${environment.api_url}/empleado/${empleado.id}`,empleado);
  }
}
