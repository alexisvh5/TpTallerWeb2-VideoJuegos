import { Component } from '@angular/core';
import { AutenticacionService } from '../../../../api/services/autenticacion/autenticacion.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

   email:string = '';
   contrasenia:string = '';
   error:string = '';

  constructor(private autService:AutenticacionService){}

  loguearse(){
    this.autService.login({email: this.email, contrasenia: this.contrasenia}).subscribe({
      next:(res)=>{
        this.autService.guardarUsuarioEnSesion(res.usuario);
        alert('Login exitoso');
      },
      error:(err)=>{
        this.error = err.error.message;
        alert('Error en el login: '+ this.error);
      }
    })
  }
}
