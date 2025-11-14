import { Component, inject } from '@angular/core';
import { AutenticacionService } from '../../../../api/services/autenticacion/autenticacion.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";


@Component({
  selector: 'app-login-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

   email:string = '';
   contrasenia:string = '';
   error:string = '';
   router = inject(Router);

  constructor(private autService:AutenticacionService){}

  loguearse(){
    this.autService.login({email: this.email, contrasenia: this.contrasenia}).subscribe({
      next:(res)=>{
        this.autService.guardarUsuarioEnSesion(res.usuario);
        alert('Login exitoso');
        this.router.navigate(['/home']);
      },
      error:(err)=>{
     console.log('ERROR COMPLETO:', err);
      console.log('BODY DEL ERROR:', err.error);

      this.error = err.error?.message || err.error?.error || 'Error al iniciar sesión';
      alert('Error en el login: ' + this.error);
      }
    })
  }
}
