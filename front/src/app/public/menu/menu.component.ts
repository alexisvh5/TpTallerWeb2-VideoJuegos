import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HomeComponent } from "../home/home.component";
import { AutenticacionService } from '../../api/services/autenticacion/autenticacion.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';

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

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/home'])
      },
      {
        label: 'Juegos',
        icon: 'pi pi-star',
        items: [
          { label: 'Lista de juegos', icon: 'pi pi-list', command: () => this.router.navigate(['/home']) },
          { label: 'Ofertas', icon: 'pi pi-percentage', command: () => alert('Ofertas próximamente') },
          { label: 'Agregar Juego', icon: 'pi pi-plus', command: () => this.router.navigate(['/juego/agregar']) }
        ]
      },
      {
      label: 'Carrito',
      icon: 'pi pi-shopping-cart',
      command: () => this.router.navigate(['/carrito'])
      },
      {
        label: 'Salir',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
