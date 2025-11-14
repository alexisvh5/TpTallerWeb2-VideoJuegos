import { Component, inject, OnInit } from '@angular/core';
import { CompraService } from '../../../../api/services/compra/compra.service';
import { AutenticacionService } from '../../../../api/services/autenticacion/autenticacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compras-usuario',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './compras-usuario.component.html',
  styleUrl: './compras-usuario.component.css',
})
export class ComprasUsuarioComponent implements OnInit{
  compraService = inject(CompraService);
  compras:any[] = [];
  cargando = true;
  error = "";

  authService = inject(AutenticacionService);


  ngOnInit(): void {

  const usuario = JSON.parse(localStorage.getItem('USUARIO') || 'null');

  if (!usuario) {
    this.error = "No se encontró el usuario logueado.";
    this.cargando = false;
    return;
  }

  const idUsuario = usuario.id;

  this.compraService.getAllComprasByUsuario(idUsuario).subscribe({
    next: (resp) => {
      console.log('RESPUESTA BACK:', resp);
      this.compras = resp.compras;
      this.cargando = false;
    },
    error: (err) => {
      this.error = err.error?.error || 'Error al cargar compras';
      this.cargando = false;
    }
  });
}


}
