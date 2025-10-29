import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EmpleadosService } from '../../../../api/services/empleados/empleados.service';
import { Empleado } from '../../interfaces/empleado.interface';
import { ActivatedRoute, RouterLinkActive, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { Button } from "primeng/button";
import { PrimengSpinner } from "../../../../shared/components/primeng/primeng-spinner/primeng-spinner";

@Component({
  selector: 'app-detail-empleado',
  imports: [CardModule, Button, RouterLink, PrimengSpinner],
  templateUrl: './detail-empleado.component.html',
  styleUrl: './detail-empleado.component.css',
})
export class DetailEmpleadoComponent implements OnInit, OnDestroy {

  spinner = true;

  id:number = 0;
  empleadoService = inject(EmpleadosService);

  activatedRouter = inject(ActivatedRoute);
  empleado!: Empleado;

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
}
