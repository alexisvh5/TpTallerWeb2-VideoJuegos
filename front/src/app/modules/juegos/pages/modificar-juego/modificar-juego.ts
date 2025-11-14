import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JuegoService } from '../../../../api/services/juego/juego.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

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
  public currentImageUrl: string ="";
  selectedFile: File | null = null;
  private httpClient = inject(HttpClient); 
  private messageService = inject(MessageService);

  form = this.fb.group({
    nombre: ['', [Validators.required]],
    anio: ['',[ Validators.required, Validators.min(1960)]],
    descripcion: ['', [Validators.required]],
    desarrollador: ['', [Validators.required]],
    precio: ['', [Validators.required, Validators.min(0)]],
    categoria: ['', Validators.required],
    imagen_url:['', Validators.required],
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
          categoria:juego.categoria,
          imagen_url:juego.imagen_url
        });
        if (juego.imagen_url) {
          this.currentImageUrl = this.construirUrlImagen(juego.imagen_url);
        }
      },
      error: (err) => {
        this.error = 'Error al cargar los datos del juego.';
        console.error(err);
      },
    });
  }

  async modificarJuego() {
  if (this.form.invalid) {
    this.error = 'Todos los campos son obligatorios.';
    return;
  }

  // Empieza con los datos del formulario (que tiene la URL vieja)
  let datosParaGuardar = {
    ...this.form.value,
    anio: +this.form.value.anio!,
    precio: +this.form.value.precio!,
  };

  // VERIFICA SI HAY UNA *NUEVA* IMAGEN
  if (this.selectedFile) {
    const newImageUrl = await this.uploadImage(); 
    
    if (newImageUrl) {
      datosParaGuardar.imagen_url = newImageUrl;
    } else {
      this.error = 'Error al subir la nueva imagen. No se guardaron los cambios.';
      return;
    }
  }
  // Si no hay 'selectedFile', datosParaGuardar.imagen_url
  // ya tiene la URL vieja 

  this.jService.modificarJuego(this.id, datosParaGuardar).subscribe({
    next: (res) => {
      this.exito = 'Juego modificado exitosamente.';
      this.router.navigate(['/home']);
    },
    error: (err) => {
      this.error = err.error.message;
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
        // Usa backend_base_url aquí porque las imágenes se sirven desde la raíz del backend
        return `${environment.backend_base_url}/public/${rutaLimpia}`; 
      }


// Función para manejar la selección de archivo
onFileSelected(event: any) {
  this.selectedFile = event.target.files[0] as File;
  if (this.selectedFile) {
  //vista previa de la *nueva* imagen
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.currentImageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}

// Función para subir el archivo al backend
async uploadImage(): Promise<string | null> { 
  if (!this.selectedFile) {
    this.messageService.add({severity:'warn', summary:'Advertencia', detail:'Selecciona un archivo primero.'});
    return null; // Devuelve null si no hay archivo
  }

  const formData = new FormData();
  formData.append('imagen', this.selectedFile, this.selectedFile.name);

  try {
    const response: any = await this.httpClient.post(`${environment.api_url}/upload`, formData).toPromise();
    this.messageService.add({severity:'success', summary:'Éxito', detail:'Nueva imagen subida.'});
    return response.imageUrl; // Devuelve la URL relativa
  } catch (error: any) {
    this.messageService.add({severity:'error', summary:'Error', detail:'Fallo al subir la nueva imagen.'});
    return null; // Devuelve null si falla
  }
}

}
