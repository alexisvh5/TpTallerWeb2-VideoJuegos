import { Routes } from '@angular/router';
import { ListEmpleadosComponent } from './pages/list-empleados/list-empleados.component';
import { CreateEmpleadoComponent } from './pages/create-empleado/create-empleado.component';
import { UpdateEmpleadoComponent } from './pages/update-empleado/update-empleado.component';
import { DetailEmpleadoComponent } from './pages/detail-empleado/detail-empleado.component';

export const empleadosRoutes: Routes = [

    {
        path : '',
        children : [
            {
                path : 'list-empleados',
                component : ListEmpleadosComponent
            },
            {
                path : 'create-empleado',
                component : CreateEmpleadoComponent
            },
            {
                path : 'update-empleado/:id',
                component : UpdateEmpleadoComponent
            },
            {
                path : 'detail-empleado/:id',
                component : DetailEmpleadoComponent
            },
            {
                path : '**',
                redirectTo : 'list-empleados'
            }
        ]
    }
    
];
