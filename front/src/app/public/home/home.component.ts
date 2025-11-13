import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { JuegoService } from '../../api/services/juego/juego.service';
import { Button } from "primeng/button";
import { CarritoService } from '../../api/services/carrito/carrito.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Button, ToastModule],
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


  ngOnInit(): void {
    this.juegoService.getAll().subscribe({
      next: (res) => {
        this.juegos = res;
        this.cargando = false;
      },
      error: (err) => {
        this.error = "Error al cargar los juegos.";
        this.cargando = false;
        console.error(err);
      }
    })
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
