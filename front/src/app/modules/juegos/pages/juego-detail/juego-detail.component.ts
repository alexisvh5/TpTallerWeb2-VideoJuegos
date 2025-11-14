import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JuegoService } from '../../../../api/services/juego/juego.service';
import { environment } from '../../../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { MessageService } from 'primeng/api';
import { ToastModule  } from "primeng/toast";
import { PrimengSpinner } from '../../../../shared/components/primeng/primeng-spinner/primeng-spinner';
import { CompraService } from '../../../../api/services/compra/compra.service';

@Component({
  selector: 'app-juego-detail',
  imports: [FormsModule, ToastModule, PrimengSpinner],
  templateUrl: './juego-detail.component.html',
  styleUrl: './juego-detail.component.css',
  providers: [MessageService]
})
export class JuegoDetailComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private juegoService = inject(JuegoService)
  private location = inject(Location);
  private carritoService = inject(CarritoService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private comprarService = inject(CompraService)

  juego: any = null;
  cargando = true;
  error = '';
  idUsuario = localStorage.getItem('USUARIO') ? JSON.parse(localStorage.getItem('USUARIO')!).id : null;

  ngOnInit(): void {
    const idJuego = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.idUsuario)
    this.juegoService.getById(idJuego).subscribe({
      next: (res) => {
        res.imagen_url = this.fixUrl(res.imagen_url);
        this.juego = res;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el detalle del juego';
        this.cargando = false;
      }
    })
  }

  fixUrl(ruta: string) {
  if (!ruta) return '';

  // Siempre devolver la ruta absoluta servida por el backend
  let limpio = ruta.replace(/^\/+/, ""); // quita barras al inicio

  return `${environment.backend_base_url}/${limpio}`;
}


volver() {
  this.location.back();
}

agregarAlCarrito(idJuego: number) {
  if (!this.idUsuario) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Iniciar sesion',
      detail: 'Tenes que iniciar sesión para agregar al carrito.'
    });
    return;
  }

  this.carritoService.agregarJuego(this.idUsuario, idJuego).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Agregado',
        detail: `${this.juego.nombre} se agregó al carrito.`
      });
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo agregar el juego al carrito.'
      });
    }
  });
}


comprarAhora() {
  if (!this.idUsuario) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Iniciar sesión',
      detail: 'Tenés que iniciar sesión para comprar.'
    });
    return;
  }

  this.comprarService.comprarJuego(this.idUsuario, this.juego.id).subscribe({
    next: (resp: any) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Compra realizada',
        detail: `Compraste ${this.juego.nombre} con éxito.`
      });

      // Opcional: redirigir al usuario a sus compras
      // this.router.navigate(['/compras/mis-compras']);
    },
    error: (err: any) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error al comprar',
        detail: err.error?.error || 'No se pudo completar la compra.'
      });
    }
  });
}


}
