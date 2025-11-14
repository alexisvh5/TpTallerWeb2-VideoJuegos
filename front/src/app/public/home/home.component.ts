import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoService } from '../../api/services/juego/juego.service';
import { Button } from "primeng/button";
import { Carousel } from "primeng/carousel";
import { CarritoService } from '../../api/services/carrito/carrito.service';
import { environment } from '../../../environments/environment.development';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  imports: [Button, ToastModule, Carousel],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  private carritoService = inject(CarritoService);
  private juegoService = inject(JuegoService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private httpClient = inject(HttpClient);

  selectedFile: File | null = null;
  uploadedImageUrl: string | null = null; // Para guardar la URL que devuelve el backend

  juegos:any[] = [];
  cargando:boolean = true;
  error = '';


  usuario: any;

  apiUrl = 'http://localhost:3000';

  private apiBaseUrl = environment.api_url.replace('/api', '');

  responsiveOptions: any[] = [
    {
      breakpoint: '1400px',
      numVisible: 5,
      numScroll: 5
    },
    {
      breakpoint: '1199px',
      numVisible: 4,
      numScroll: 4
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];



  ngOnInit(): void {

    const data = localStorage.getItem('USUARIO');

    if(data){
      this.usuario = JSON.parse(data);
      console.log('Usuario logueado:', this.usuario);
    }

    this.juegoService.getAll().subscribe({
      next: (res) => {
        this.juegos = res.map((juego: any) => ({
          ...juego,
          imagen_url: this.construirUrlImagen(juego.imagen_url)
        }));
        this.cargando = false;
      },
      error: (err) => {
        this.error = "Error al cargar los juegos.";
        this.cargando = false;
        console.error(err);
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

  eliminarJuego(id:number){
    this.juegoService.eliminarJuego(id).subscribe({
      next: (res) => {
        // this.router.navigate(['/home']).then(() => { window.location.reload(); });
        window.location.reload();
      },
      error: (err)=> {
        console.error(err);
      }
    })
  }

  editarJuego(id: number) {
  this.router.navigate(['/juego/modificar/', id]);
  }

  agregarAlCarrito(idJuego: number) {
    const idUsuario = localStorage.getItem('USUARIO') ? JSON.parse(localStorage.getItem('USUARIO')!).id : null;

    this.carritoService.agregarJuego(idUsuario, idJuego).subscribe({
    next: () => {
      const juegoNombre = this.juegos.find(j => j.id === idJuego).nombre;
      this.mostrarMensajeExito(juegoNombre);
    },
    error: (err) => console.error(err),
  });
  }

    mostrarMensajeExito(juegoNombre: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Juego agregado',
      detail: `${juegoNombre} se añadió al carrito.`,
      life: 3000
    });
  }

  verJuego(id:number){
    this.router.navigate(['/juego', id])
  }

}
