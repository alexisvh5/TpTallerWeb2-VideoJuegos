import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { FormEmpleado } from '../../components/form-empleado/form-empleado';
import { Empleado } from '../../interfaces/empleado.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmpleadosService } from '../../../../api/services/empleados/empleados.service';
import { PrimengSpinner } from '../../../../shared/components/primeng/primeng-spinner/primeng-spinner';

@Component({
  selector: 'app-update-empleado',
  imports: [Button, FormEmpleado, RouterLink, PrimengSpinner],
  templateUrl: './update-empleado.component.html',
  styleUrl: './update-empleado.component.css',
})
export class UpdateEmpleadoComponent implements OnInit, OnDestroy {

  router = inject(Router);
  empleadoService = inject(EmpleadosService);
  activatedRouter = inject(ActivatedRoute);
  empleado!: Empleado;
  id: number = 0;
  spinner = true;

  ngOnInit(): void {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.verEmpleado();
  }

  ngOnDestroy(): void {}

  verEmpleado() {
    this.empleadoService.verEmpleado(this.id).subscribe({
      next: (empleado: Empleado) => {
        this.empleado = empleado;
      },
      error: (error) => {
        //mensaje de error
      },
      complete: () => {
        this.spinner = false;
      },
    });
  }

  actualizarEmpleado(empleado: Empleado) {
    this.empleadoService.createEmpleado(empleado).subscribe({
      next: (data: Empleado) => {
        console.log(data);
      },
      error: (error) => {
        //mensaje de error
      },
      complete: () => {
        this.router.navigate(['/empleados/list-empleados']);
      },
    });
  }
}
