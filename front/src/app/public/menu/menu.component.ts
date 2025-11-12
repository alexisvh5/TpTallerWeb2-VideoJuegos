import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HomeComponent } from "../home/home.component";
import { AutenticacionService } from '../../api/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, FooterComponent, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  auth = inject(AutenticacionService);
  router = inject(Router);

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
