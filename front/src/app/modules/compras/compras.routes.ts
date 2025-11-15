import { Routes } from "@angular/router";
import { ComprasUsuarioComponent } from "./pages/compras-usuario/compras-usuario.component";

export const comprasRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mis-compras',
        component: ComprasUsuarioComponent
      }
    ]
  }
]
