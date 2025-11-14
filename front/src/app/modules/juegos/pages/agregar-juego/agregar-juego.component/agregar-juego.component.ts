import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JuegoService } from '../../../../../api/services/juego/juego.service';
import { min } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment.development';

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

  private httpClient = inject(HttpClient);
  private messageService = inject(MessageService);

  // Propiedades para la subida de imágenes
  selectedFile: File | null = null;
  uploadedImageUrl: string | null = null; // Para guardar la URL que devuelve el backend



  // Función para manejar la selección de archivo
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      console.log('Archivo seleccionado:', this.selectedFile.name);
    }
  }

  // Función para subir el archivo al backend
  async uploadImage() {
    if (!this.selectedFile) {
      this.messageService.add({severity:'warn', summary:'Advertencia', detail:'Selecciona un archivo primero.'});
      return;
    }

    const formData = new FormData();
    formData.append('imagen', this.selectedFile, this.selectedFile.name); // 'imagen' debe coincidir con el campo de Multer

    try {
      const response: any = await this.httpClient.post(`${environment.api_url}/upload`, formData).toPromise();
      this.uploadedImageUrl = response.imageUrl; // Guarda la URL relativa devuelta por el backend
      this.messageService.add({severity:'success', summary:'Éxito', detail:'Imagen subida correctamente.'});
      console.log('Imagen subida. URL relativa:', this.uploadedImageUrl);
      return this.uploadedImageUrl; // Devuelve la URL para que pueda ser usada al guardar el juego
    } catch (error: any) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Fallo al subir la imagen.'});
      console.error('Error al subir la imagen:', error);
      return null;
    }
  }

  form = this.fb.group({
    nombre: ['', Validators.required],
    anio: ['', Validators.required, Validators.min(1960)],
    descripcion: ['', Validators.required],
    desarrollador: ['', [Validators.required]],
    precio: ['', [Validators.required, Validators.min(0)]],
    categoria: ['', Validators.required],
  });

  async agregarJuego(){
    //let imageUrlToSave: string | null = null;
    let imageUrlToSave: any = null;


    if(this.form.invalid){
          this.error = 'Todos los campos son obligatorios.';
          return;
    }
      if (this.selectedFile) {
       imageUrlToSave = await this.uploadImage(); // Primero sube la imagen
        if (!imageUrlToSave) {
        // Si la subida falla, no continuar con la creación del juego
          return;
        }
      }

      const juegoParaGuardar = {
      ...this.form.value, // Trae nombre, anio, descripcion, etc.

      anio: +this.form.value.anio!,
      precio: +this.form.value.precio!,

      imagen_url: this.uploadedImageUrl // Añade la URL de la imagen
    };

        this.jService.agregarJuego(juegoParaGuardar).subscribe({
          next: (res) => {
            this.exito = 'Juego agregado exitosamente.';
            this.router.navigate(['/home'])
          },
          error: (err) => {
            this.error = err.error.message;
          }
        })
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
    // Usa backend_base_url aquí porque las imágenes se sirven desde la raíz del backend
    return `${environment.backend_base_url}/public/${rutaLimpia}`;
  }



}
