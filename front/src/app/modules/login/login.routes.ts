import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login-component/login-component";

export const loginRoutes: Routes = [
  {
    path:'',
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  }
]
