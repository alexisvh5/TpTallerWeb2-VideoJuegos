import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoService } from '../../api/services/juego/juego.service';
import { Button } from "primeng/button";
import { Carousel } from "primeng/carousel";
import { CarritoService } from '../../api/services/carrito/carrito.service';
import { environment } from '../../../environments/environment.development';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


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

  juegos:any[] = [];
  cargando:boolean = true;
  error = '';
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

  private construirUrlImagen(rutaRelativa: string): string {
    if (rutaRelativa?.startsWith('http')) {
      return rutaRelativa;
    }
    return `${this.apiBaseUrl}${rutaRelativa}`;
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
}
