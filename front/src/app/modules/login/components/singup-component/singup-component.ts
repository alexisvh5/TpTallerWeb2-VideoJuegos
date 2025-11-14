import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionService } from '../../../../api/services/autenticacion/autenticacion.service';
import { passwordValidator } from '../../../../shared/password.validator';

@Component({
  selector: 'app-singup-component',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './singup-component.html',
  styleUrl: './singup-component.css',
})
export class SingupComponent {

  error = '';
  exito = '';
  submitted = false;

  private fb = inject(FormBuilder);
  private auth = inject(AutenticacionService);
  private router = inject(Router);

  form = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    direccion: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contrasenia: ['', [Validators.required, passwordValidator]],
  });

  signUp() {

    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = '';
      this.exito = '';
      return;
    }

    this.auth.registrarse(this.form.value).subscribe({
      next: (res) => {
        this.error = '';
        this.exito = 'Registro exitoso. Redirigiendo al login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.exito = '';
        this.error = err.error?.message
          || err.error?.error
          || (typeof err.error === 'string' ? err.error : null)
          || 'Error al registrarse';
      },
    });
  }
}
