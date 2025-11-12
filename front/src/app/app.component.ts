import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from "./public/menu/menu.component";
import { AutenticacionService } from './api/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, MenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud-empleados';

  private auth = inject(AutenticacionService);

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

}
