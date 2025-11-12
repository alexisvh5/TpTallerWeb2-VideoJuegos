import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/carrito`;

  constructor() { }


  obtenerCarrito(idUsuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idUsuario}`);
  }

  agregarJuego(idUsuario: number, idJuego: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar`, { idUsuario, idJuego });
  }

  eliminarJuego(idUsuario: number, idJuego: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar`, { body: { idUsuario, idJuego } });
  }

  vaciarCarrito(idUsuario: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vaciar`, { body: { idUsuario } });
  }
}
