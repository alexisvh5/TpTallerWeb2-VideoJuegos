import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoService } from '../../api/services/juego/juego.service';
import { Button } from 'primeng/button';
import { Carousel } from 'primeng/carousel';
import { CarritoService } from '../../api/services/carrito/carrito.service';
import { environment } from '../../../environments/environment.development';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { FiltrosJuego, Juego } from '../../modules/juegos/interfaces/juego.interface';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-home',
  imports: [
    Button,
    ToastModule,
    Carousel,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    CardModule,
    SliderModule
  ],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private carritoService = inject(CarritoService);
  private juegoService = inject(JuegoService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private httpClient = inject(HttpClient);

  selectedFile: File | null = null;
  uploadedImageUrl: string | null = null; // Para guardar la URL que devuelve el backend

  juegos: Juego[] = [];
  generos: string[] = [];
  cargando: boolean = false;
  error = '';
  private apiBaseUrl = environment.api_url.replace('/api', '');
responsiveOptions: any[] = [
  {
    breakpoint: '1600px',   // hasta 1600px de ancho
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '1200px',   // desktop chico / laptop
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '992px',    // tablet horizontal
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '768px',    // mobile / tablet vertical
    numVisible: 1,
    numScroll: 1
  }
];


  filtros: FiltrosJuego = {
    nombre: '',
    genero: 'Cualquiera',
    precioMin: undefined,
    precioMax: undefined,
  };

  // Valores iniciales del slider
  priceRange: number[] = [1, 150]; // [precioMin, precioMax]
  minPrice: number = 0;
  maxPrice: number = 150;


  actualizarFiltrosPrecio() {
    this.filtros.precioMin = this.priceRange[0];
    this.filtros.precioMax = this.priceRange[1];
  }

  ngOnInit(): void {
    this.cargarFiltrosGuardados();
    this.cargarGeneros();
    this.cargarJuegos();
  }

  cargarFiltrosGuardados() {
      const filtrosGuardados = localStorage.getItem('filtrosJuegos');
    if(filtrosGuardados){
    this.filtros = JSON.parse(filtrosGuardados);

    this.priceRange = [
      this.filtros.precioMin ?? this.minPrice,
      this.filtros.precioMax ?? this.maxPrice
    ];
  }
  }

  private cargarGeneros() {
    this.juegoService.getGeneros().subscribe({
      next: (generos) => {
        this.generos = [
          { label: 'Cualquiera', value: 'Cualquiera' },
          ...generos.map((g: any) => ({
            label: g,
            value: g,
          })),
        ];
        console.log(generos)
      },
      error: (err) => {
        console.error('Error al cargar los géneros:', err);
      },
    });
  }

  private cargarJuegos() {
    this.cargando = true;

    const filtrosAplicados: FiltrosJuego = {
      nombre: this.filtros.nombre || undefined,
      genero: this.filtros.genero !== 'Cualquiera' ? this.filtros.genero : undefined,
      precioMin: this.filtros.precioMin || undefined,
      precioMax: this.filtros.precioMax || undefined,
    };

    this.juegoService.getAll(filtrosAplicados).subscribe({
      next: (res) => {
        this.juegos = res.map((juego: any) => ({
          ...juego,
          imagen_url: this.construirUrlImagen(juego.imagen_url),
        }));
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los juegos.';
        this.cargando = false;
        console.error(err);
      },
    });
  }

  aplicarFiltros() {
    this.guardarFiltros();
    this.cargarJuegos();
  }

  // Para que los filtros no se vayan al cambiar de pantalla
  guardarFiltros() {
    localStorage.setItem('filtrosJuegos', JSON.stringify(this.filtros));
  }

  limpiarFiltros() {
    this.filtros = {
      nombre: '',
      genero: 'Cualquiera',
      precioMin: undefined,
      precioMax: undefined,
    };
    this.cargarJuegos();
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

  eliminarJuego(id: number) {
    this.juegoService.eliminarJuego(id).subscribe({
      next: (res) => {
        // this.router.navigate(['/home']).then(() => { window.location.reload(); });
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  editarJuego(id: number) {
    this.router.navigate(['/juego/modificar/', id]);
  }

  agregarAlCarrito(idJuego: number) {
    const idUsuario = localStorage.getItem('USUARIO')
      ? JSON.parse(localStorage.getItem('USUARIO')!).id
      : null;

    this.carritoService.agregarJuego(idUsuario, idJuego).subscribe({
      next: () => {
        const juego = this.juegos.find((j) => j.id === idJuego);
        if (juego) {
          const juegoNombre = juego.nombre;
          this.mostrarMensajeExito(juego.nombre);
        }
      },
      error: (err) => console.error(err),
    });
  }

  mostrarMensajeExito(juegoNombre: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Juego agregado',
      detail: `${juegoNombre} se añadió al carrito.`,
      life: 3000,
    });
  }
}
