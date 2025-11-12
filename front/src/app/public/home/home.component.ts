import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { JuegoService } from '../../api/services/juego/juego.service';
import { Button } from "primeng/button";

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Button],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  private juegoService = inject(JuegoService);
  private router = inject(Router)
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
}
