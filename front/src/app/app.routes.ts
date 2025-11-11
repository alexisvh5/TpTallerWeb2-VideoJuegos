import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { AuthGuard } from './api/guards/autenticacion.guard';


export const routes: Routes = [

    {
        path: '',
        canActivate: [AuthGuard],
        component: HomeComponent
    },
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.routes').then(m => m.loginRoutes)
    },
    {
        path: 'empleados',
        loadChildren: () => import('./modules/empleados/empleados.routes').then(e => e.empleadosRoutes)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
