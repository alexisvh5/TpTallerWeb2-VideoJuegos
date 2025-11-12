import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login-component/login-component";
import { SingupComponent } from "./components/singup-component/singup-component";

export const loginRoutes: Routes = [
  {
    path:'',
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SingupComponent
      }
    ]
  }
]
