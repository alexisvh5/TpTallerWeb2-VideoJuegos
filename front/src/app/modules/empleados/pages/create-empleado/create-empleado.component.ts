import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadosService } from '../../../../api/services/empleados/empleados.service';
import { InputTextModule } from 'primeng/inputtext';
import { Empresa } from '../../../empresas/interfaces/empresa.interface';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { Empleado } from '../../interfaces/empleado.interface';
import { Router, RouterLink } from '@angular/router';
import { FormEmpleado } from "../../components/form-empleado/form-empleado";

@Component({
  selector: 'app-create-empleado',
  imports: [ReactiveFormsModule, InputTextModule, Button, RouterLink, FormEmpleado],
  templateUrl: './create-empleado.component.html',
  styleUrl: './create-empleado.component.css',
})
export class CreateEmpleadoComponent implements OnInit, OnDestroy {
  router = inject(Router);

  empleadoService = inject(EmpleadosService);

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  crearEmpleado(empleado:Empleado) {
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
