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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [MenubarModule, InputTextModule, AvatarModule, RouterOutlet, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  auth = inject(AutenticacionService);
  router = inject(Router);
  adminGuard = inject(AutenticacionService);
  searchTerm: string = '';


  ngOnInit() {
    const juegosItems: any[] = [
      { label: 'Lista de juegos', icon: 'pi pi-list', command: () => this.router.navigate(['/']) },
      { label: 'Ofertas', icon: 'pi pi-percentage', command: () => alert('Ofertas próximamente') },
    ];

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
      label: 'Carrito',
      icon: 'pi pi-shopping-cart',
      command: () => this.router.navigate(['/carrito'])
      },
      {
      label: 'Mis compras',
      icon: 'pi pi-check-circle',
      command: () => this.router.navigate(['compras/mis-compras'])
      },
      {
        label: 'Salir',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  buscarJuego() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['juego/buscar', this.searchTerm.trim()]);
      this.searchTerm = '';
    }
  }


  logout() {
    localStorage.removeItem('USUARIO');
    localStorage.removeItem('filtrosJuegos');
    this.router.navigate(['/login']);
  }
}
