import { CanActivateFn, Router } from "@angular/router";
import { AutenticacionService } from "../services/autenticacion/autenticacion.service";
import { inject } from "@angular/core";

export const AuthGuard: CanActivateFn = () => {

  const autService = inject(AutenticacionService);
  const router = inject(Router);

  const usuarioDeSesion = autService.getUsuarioEnSesion();

  if(!usuarioDeSesion){
    router.navigate(['/login']);
    return false;
  }

  return true;
}
