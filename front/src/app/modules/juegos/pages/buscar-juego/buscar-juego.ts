import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JuegoService } from '../../../../api/services/juego/juego.service';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-buscar-juego',
  imports: [],
  templateUrl: './buscar-juego.html',
  styleUrl: './buscar-juego.css',
})
export class BuscarJuego implements OnInit{

  nombreJuego: string = '';
  juegos: any[] = [];
  route = inject(ActivatedRoute);
  juegoService = inject(JuegoService);
  router = inject(Router);

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nombreJuego = params['nombre'];
      this.buscar();
    });
  }

  buscar() {
    this.juegoService.buscarPorNombre(this.nombreJuego).subscribe({
      next: (res) => {
       if (Array.isArray(res) && res.length > 0 && res[0].juegos) {
        // Caso en el que la API devuelve [{ message: "...", juegos: [...] }]
        this.juegos = res[0].juegos;
      } else if (Array.isArray(res)) {
        // Caso raro en el que devuelve directamente un array de juegos
        this.juegos = res;
      } else if (res && res.juegos) {
        // Caso en que devuelve un solo objeto con juegos
        this.juegos = res.juegos;
      } else {
        this.juegos = [];
      }

      this.juegos = this.juegos.map(j => ({
          ...j,
          imagen_url: this.fixUrl(j.imagen_url)
        }));

      console.log('✅ Juegos normalizados:', this.juegos);
    },
    error: (err) => {
      console.error('❌ Error buscando juegos:', err);
      this.juegos = [];
    }
    });
  }

  fixUrl(ruta: string) {
  if (!ruta) return '';
  let limpio = ruta.replace(/^\/+/, "");
  return `${environment.backend_base_url}/${limpio}`;
}

verJuego(id:number){
  this.router.navigate(['/juego', id])
}

}
