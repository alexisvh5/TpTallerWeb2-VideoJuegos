import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JuegoService } from '../../../../../api/services/juego/juego.service';
import { min } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment.development';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-agregar-juego.component',
  imports: [ReactiveFormsModule,ToastModule],
  providers: [
    MessageService 
  ],
  templateUrl: './agregar-juego.component.html',
  styleUrl: './agregar-juego.component.css',
})
export class AgregarJuegoComponent {

  error = '';
  exito = '';
  submitted = false;

  private fb = inject(FormBuilder);
  private jService = inject(JuegoService);
  private router = inject(Router);

  private httpClient = inject(HttpClient);
  private messageService = inject(MessageService);

  selectedFile: File | null = null;
  uploadedImageUrl: string | null = null;

  form = this.fb.group({
    nombre: ['', Validators.required],
    anio: [null, [Validators.required, Validators.min(1960)]],
    descripcion: ['', Validators.required],
    desarrollador: ['', Validators.required],
    precio: [null, [Validators.required, Validators.min(0)]],
    categoria: ['', Validators.required],
  });

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      console.log('Archivo seleccionado:', this.selectedFile.name);
    }
  }

  async uploadImage() {
    if (!this.selectedFile) {
      this.messageService.add({severity:'warn', summary:'Advertencia', detail:'Selecciona un archivo primero.'});
      return null;
    }

    const formData = new FormData();
    formData.append('imagen', this.selectedFile, this.selectedFile.name);

    try {
      const response: any = await this.httpClient
        .post(`${environment.api_url}/upload`, formData)
        .toPromise();

      this.uploadedImageUrl = response.imageUrl;
      this.messageService.add({severity:'success', summary:'Éxito', detail:'Imagen subida correctamente.'});
      return this.uploadedImageUrl;
    } catch (error: any) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Fallo al subir la imagen.'});
      console.error('Error al subir la imagen:', error);
      return null;
    }
  }

  async agregarJuego() {
    this.submitted = true;
    this.error = '';
    this.exito = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Revisá los campos marcados en rojo.';
      return;
    }

    let imageUrlToSave: string | null = null;

    if (this.selectedFile) {
      imageUrlToSave = await this.uploadImage();
      if (!imageUrlToSave) {
        // si falla la subida, no sigo
        return;
      }
    }

    const juegoParaGuardar = {
      ...this.form.value,
      anio: +this.form.value.anio!,
      precio: +this.form.value.precio!,
      imagen_url: this.uploadedImageUrl
    };

    this.jService.agregarJuego(juegoParaGuardar).subscribe({
      next: () => {
        this.exito = 'Juego agregado exitosamente.';
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.error = err.error?.message ?? 'Ocurrió un error al agregar el juego.';
      }
    });
  }

  public construirUrlImagen(rutaRelativa: string): string {
    if (!rutaRelativa) {
      return '';
    }
    if (rutaRelativa.startsWith('http')) {
      return rutaRelativa;
    }
    let rutaLimpia = rutaRelativa;
    if (rutaLimpia.startsWith('/')) {
      rutaLimpia = rutaLimpia.substring(1);
    }
    if (rutaLimpia.startsWith('public/')) {
      rutaLimpia = rutaLimpia.substring(7);
    }
    return `${environment.backend_base_url}/public/${rutaLimpia}`;
  }
}
