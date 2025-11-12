import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JuegoService } from '../../../../api/services/juego/juego.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-juego',
  imports: [ReactiveFormsModule],
  templateUrl: './modificar-juego.html',
  styleUrl: './modificar-juego.css',
})
export class ModificarJuego {

  error = '';
  exito = '';

  private fb = inject(FormBuilder);
  private jService = inject(JuegoService);
  private router = inject(Router);
  private activatedRouter = inject(ActivatedRoute);
  private id:number = 0;

  form = this.fb.group({
    nombre: ['', [Validators.required]],
    anio: ['',[ Validators.required, Validators.min(1960)]],
    descripcion: ['', [Validators.required]],
    desarrollador: ['', [Validators.required]],
    precio: ['', [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.traerJuego();
  }

  traerJuego() {
    this.jService.getById(this.id).subscribe({
      next: (juego) => {
        this.form.patchValue({
          nombre: juego.nombre,
          anio: juego.anio,
          descripcion: juego.descripcion,
          desarrollador: juego.desarrollador,
          precio: juego.precio,
        });
      },
      error: (err) => {
        this.error = 'Error al cargar los datos del juego.';
        console.error(err);
      },
    });
  }

  modificarJuego(){
    if(this.form.invalid){
          this.error = 'Todos los campos son obligatorios.';
          return;
        }

        this.jService.modificarJuego(this.id, this.form.value).subscribe({
          next: (res) => {
            this.exito = 'Juego modificado exitosamente.';
            this.router.navigate(['/home'])
          },
          error: (err) => {
            this.error = err.error.message;
          }
        })
    }

}
