import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { EmpleadosService } from '../../../../api/services/empleados/empleados.service';
import { Empleado } from '../../interfaces/empleado.interface';
import { Empresa } from '../../../empresas/interfaces/empresa.interface';

@Component({
  selector: 'app-form-empleado',
  imports: [ReactiveFormsModule, InputTextModule, Select, Button],
  templateUrl: './form-empleado.html',
  styleUrl: './form-empleado.css',
})
export class FormEmpleado {

  title:string = "Crear Empleado";

  private fb = inject(FormBuilder);

  router = inject(Router);

  form!: FormGroup;

  empleadoService = inject(EmpleadosService);

  empresas: Empresa[] = [{ id: 2, nombre: 'HealthPlus', empleados: [] }];

  empleado = input<Empleado>();

  eventEmitterFormEmpleado = output<Empleado>();

  ngOnInit(): void {
    if(this.empleado()){
      this.title = "Actualizar empleado"
    }

    this.form = this.fb.group({
      nombre: [this.empleado()?.nombre, [Validators.required]],
      empresa: [this.empleado()?.empresa?.id, []],
    });
  }

  ngOnDestroy(): void {}

  sendEmpleado() {
    const empleado: Empleado = {
      id: 0,
      nombre: this.form.get('nombre')?.value.trim(),
      id_empresa: this.form.get('empresa')?.value,
    };

    this.eventEmitterFormEmpleado.emit(empleado);

  }
}
