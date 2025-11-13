import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../api/services/carrito/carrito.service';
import { Button } from "primeng/button";
import { TableModule } from 'primeng/table';
import { CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [Button, TableModule, CurrencyPipe],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent implements OnInit {

  carrito: any[] = [];
  carritoService = inject(CarritoService);
  idUsuario = localStorage.getItem('USUARIO') ? JSON.parse(localStorage.getItem('USUARIO')!).id : null;

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
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
