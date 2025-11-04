import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EmpleadosService } from '../../../../api/services/empleados/empleados.service';
import { Empleado } from '../../interfaces/empleado.interface';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PrimengSpinner } from "../../../../shared/components/primeng/primeng-spinner/primeng-spinner";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Toast } from 'primeng/toast';
import { TablaEmpleadosList } from '../../components/tabla-empleados-list/tabla-empleados-list';
@Component({
  selector: 'app-list-empleados',
  imports: [TableModule, ProgressSpinnerModule, TablaEmpleadosList, PrimengSpinner,ToastModule,Toast],
  templateUrl: './list-empleados.component.html',
  styleUrl: './list-empleados.component.css',
  providers : [MessageService]
})
export class ListEmpleadosComponent implements OnInit, OnDestroy {

  spinner = true;

  empleados: Empleado[] = [];
  empleadoService = inject(EmpleadosService);
  messageService = inject(MessageService);

  ngOnInit(): void {
    this.listarEmpleados();
  }

  ngOnDestroy(): void {}

  listarEmpleados() {
    this.empleadoService.listEmpleados().subscribe({
      next: (empleados: Empleado[]) => {
        this.empleados = empleados;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error}`, life: 3000 });
      },
      complete: () => {
        this.spinner = false;
      },
    });
  }
}
