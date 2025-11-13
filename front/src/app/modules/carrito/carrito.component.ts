import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../api/services/carrito/carrito.service';
import { Button } from "primeng/button";
import { TableModule } from 'primeng/table';
import { CurrencyPipe} from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-carrito',
  imports: [Button, TableModule, CurrencyPipe, CardModule, ToastModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent implements OnInit {

  carrito: any[] = [];
  carritoService = inject(CarritoService);
  idUsuario = localStorage.getItem('USUARIO') ? JSON.parse(localStorage.getItem('USUARIO')!).id : null;
  private messageService = inject(MessageService);

  ngOnInit(): void {this.cargarCarrito();}

  cargarCarrito() {
    this.carritoService.obtenerCarrito(this.idUsuario).subscribe({
      next: (res) => {
        this.carrito = res.CarritoJuego.map((cj: { Juego: any; }) => cj.Juego);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  agregarJuego(idJuego: number) {
    this.carritoService.agregarJuego(this.idUsuario, idJuego).subscribe({
      next: () => {
        this.cargarCarrito();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  eliminarJuego(idJuego: number) {
    this.carritoService.eliminarJuego(this.idUsuario, idJuego).subscribe({
      next: () => {
      this.cargarCarrito();
      const juegoNombre = this.carrito.find(j => j.id === idJuego).nombre;
      this.mostrarMensaje('success', 'Juego eliminado', `${juegoNombre} se eliminó del carrito.`);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito(this.idUsuario).subscribe({
      next: () => {
        this.cargarCarrito();
        this.mostrarMensaje('success', 'Carrito vaciado', 'Todos los juegos fueron eliminados del carrito.');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  get totalItems(): number {
  return this.carrito.length;
}

  get totalPrecio(): number {
    return this.carrito.reduce((sum, item) => sum + Number(item.precio || 0), 0);
  }

  private mostrarMensaje(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity,
      summary,
      detail,
      life: 3000,
    });
  }
}
