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
  }

  logout() {
    localStorage.removeItem('USUARIO');
    this.router.navigate(['/login']);
  }
}
