import { Routes } from "@angular/router";
import { AgregarJuegoComponent } from "./pages/agregar-juego/agregar-juego.component/agregar-juego.component";
import { ModificarJuego } from "./pages/modificar-juego/modificar-juego";

export const juegosRoutes: Routes = [
  {
    path:'',
    children: [
      {
        path: 'agregar',
        component: AgregarJuegoComponent
      },
      {
        path: 'modificar/:id',
        component: ModificarJuego
      }
    ]
  }
]
