import { Component, inject, input, output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Empleado } from '../../interfaces/empleado.interface';
import { Button } from 'primeng/button';
import { EmpleadosService } from '../../../../api/services/empleados/empleados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-empleados-list',
  imports: [TableModule, Button],
  templateUrl: './tabla-empleados-list.html',
  styleUrl: './tabla-empleados-list.css',
})
export class TablaEmpleadosList {
  empleadoService = inject(EmpleadosService);
  empleados = input.required<Empleado[]>();

  router = inject(Router);

  eventEmitterTableEmpleado = output<boolean>();

  createEmpleado() {
    this.router.navigate([`empleados/create-empleado`]);
  }

  editarEmpleado(empleado: Empleado) {
    this.router.navigate([`empleados/update-empleado`, empleado.id]);
  }

  verEmpleado(empleado: Empleado) {
    this.router.navigate([`empleados/detail-empleado`, empleado.id]);
    //empleados/detail-empleado/1
  }

  eliminarEmpleado(empleado: Empleado) {
    this.empleadoService.eliminarEmpleado(empleado).subscribe({
      next: (data) => {
        //mensaje de exito
      },
      error: (error) => {
        //mensaje de error
      },
      complete: () => {
        this.eventEmitterTableEmpleado.emit(true);
      },
    });
  }
}
