import { Routes } from "@angular/router";
import { AgregarJuegoComponent } from "./pages/agregar-juego/agregar-juego.component/agregar-juego.component";
import { ModificarJuego } from "./pages/modificar-juego/modificar-juego";
import { AdminGuard } from "../../api/guards/admin.guard";

export const juegosRoutes: Routes = [
  {
    path:'',
    children: [
      {
        path: 'agregar',
        canActivate: [AdminGuard],
        component: AgregarJuegoComponent
      },
      {
        path: 'modificar/:id',
        canActivate: [AdminGuard],
        component: ModificarJuego
      }
    ]
  }
]
