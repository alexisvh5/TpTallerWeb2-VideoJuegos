import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutenticacionService } from '../../../../api/services/autenticacion/autenticacion.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-singup-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './singup-component.html',
  styleUrl: './singup-component.css',
})
export class SingupComponent {

  error = '';
  exito = '';

  private fb = inject(FormBuilder);
  private auth = inject(AutenticacionService);
  private router = inject(Router);

  form = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    direccion: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contrasenia: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    ){}


  signUp(){
    if(this.form.invalid){
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    this.auth.registrarse(this.form.value).subscribe({
      next: (res) => {
        this.exito = 'Registro exitoso. Redirigiendo al login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.error = err.error.message;
        alert(this.error);
      }
    })
  }

}
