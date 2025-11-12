import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { AuthGuard } from './api/guards/autenticacion.guard';
import { NoAuthGuard } from './api/guards/noAutenticacion.guard';


export const routes: Routes = [

    {
        path: 'home',
        canActivate: [AuthGuard],
        component: HomeComponent
    },
    {
        path: 'login',
        canActivate: [NoAuthGuard],
        loadChildren: () => import('./modules/login/login.routes').then(m => m.loginRoutes)
    },
    {
        path: 'empleados',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/empleados/empleados.routes').then(e => e.empleadosRoutes)
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
