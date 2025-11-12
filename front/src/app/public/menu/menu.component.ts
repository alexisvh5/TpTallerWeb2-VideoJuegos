import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HomeComponent } from "../home/home.component";
import { AutenticacionService } from '../../api/services/autenticacion/autenticacion.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { AdminGuard } from '../../api/guards/admin.guard';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { JuegoService } from '../../api/services/juego/juego.service';

@Component({
  selector: 'app-menu',
  imports: [MenubarModule, InputTextModule, AvatarModule, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  auth = inject(AutenticacionService);
  router = inject(Router);
  adminGuard = inject(AutenticacionService);
  searchTerm: string = '';
  juegosFiltrados = [];
  juegoService = inject(JuegoService);

  private searchSubject = new Subject<string>();


  ngOnInit() {
    const juegosItems: any[] = [
      { label: 'Lista de juegos', icon: 'pi pi-list', command: () => this.router.navigate(['/home']) },
      { label: 'Ofertas', icon: 'pi pi-percentage', command: () => alert('Ofertas próximamente') },
    ];

    // 👇 Si el usuario es admin, agregamos la opción extra
    const usuarioData = localStorage.getItem('USUARIO');
    if (usuarioData) {
      const usuario = JSON.parse(usuarioData);
      if (usuario.rol === 'ADMIN') {
        juegosItems.push({
          label: 'Agregar Juego',
          icon: 'pi pi-plus',
          command: () => this.router.navigate(['/juego/agregar'])
        });
      }
    }

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/home'])
      },
      {
        label: 'Juegos',
        icon: 'pi pi-star',
        items: juegosItems
      },
      {
        label: 'Salir',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];

    this.searchSubject.pipe(
      debounceTime(300), // espera 300ms tras dejar de escribir
      distinctUntilChanged()
    ).subscribe((term) => this.buscarJuegos(term));
  }

  onSearchChange() {
    this.searchSubject.next(this.searchTerm);
  }

  buscarJuegos(term: string) {
    if (!term.trim()) {
      this.juegosFiltrados = [];
      return;
    }

    this.juegoService.buscarPorNombre(term).subscribe({
      next: (juegos) => {
        this.juegosFiltrados = juegos;
        console.log('Resultados:', juegos);
      },
      error: (err) => console.error(err)
    });


  }

  logout() {
    localStorage.removeItem('USUARIO');
    this.router.navigate(['/login']);
  }
}
