import { Routes } from "@angular/router";
import { AgregarJuegoComponent } from "./pages/agregar-juego/agregar-juego.component/agregar-juego.component";
import { ModificarJuego } from "./pages/modificar-juego/modificar-juego";
import { AdminGuard } from "../../api/guards/admin.guard";
import { BuscarJuego } from "./pages/buscar-juego/buscar-juego";

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
      },
      {
        path: 'buscar/:nombre',
        component: BuscarJuego
      }
    ]
  }
]
