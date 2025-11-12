import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JuegoService } from '../../../../../api/services/juego/juego.service';
import { min } from 'rxjs';

@Component({
  selector: 'app-agregar-juego.component',
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-juego.component.html',
  styleUrl: './agregar-juego.component.css',
})
export class AgregarJuegoComponent {

  error = '';
  exito = '';

  private fb = inject(FormBuilder);
  private jService = inject(JuegoService);
  private router = inject(Router);

  form = this.fb.group({
    nombre: ['', Validators.required],
    anio: ['', Validators.required, Validators.min(1960)],
    descripcion: ['', Validators.required],
    desarrollador: ['', [Validators.required]],
    precio: ['', [Validators.required, Validators.min(0)]],
  });

  agregarJuego(){
    if(this.form.invalid){
          this.error = 'Todos los campos son obligatorios.';
          return;
        }

        this.jService.agregarJuego(this.form.value).subscribe({
          next: (res) => {
            this.exito = 'Juego agregado exitosamente.';
            this.router.navigate(['/home'])
          },
          error: (err) => {
            this.error = err.error.message;
          }
        })
    }


}
