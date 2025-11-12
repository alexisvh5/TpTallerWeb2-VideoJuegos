import { CanActivateFn, Router } from "@angular/router";
import { AutenticacionService } from "../services/autenticacion/autenticacion.service";
import { inject } from "@angular/core";

export const NoAuthGuard: CanActivateFn = () => {

  const autService = inject(AutenticacionService);
  const router = inject(Router);

  if(autService.isLoggedIn()){
    router.navigate(['/home']);
    return false;
  }

  return true;
}
