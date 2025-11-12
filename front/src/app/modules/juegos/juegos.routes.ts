import { Routes } from "@angular/router";
import { AgregarJuegoComponent } from "./pages/agregar-juego/agregar-juego.component/agregar-juego.component";

export const juegosRoutes: Routes = [
  {
    path:'',
    children: [
      {
        path: 'agregar',
        component: AgregarJuegoComponent
      }
    ]
  }
]
