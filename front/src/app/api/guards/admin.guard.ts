import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  private router = inject(Router);

  canActivate(): boolean{
    const usuario = localStorage.getItem('USUARIO');

    if (usuario) {
      const data = JSON.parse(usuario);
      if (data.rol === 'ADMIN') {
        return true;
      }
  }

  this.router.navigate(['/home']);
  return false;
}
}
