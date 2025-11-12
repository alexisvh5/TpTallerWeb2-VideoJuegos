import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class JuegoService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/juego`;

  getAll(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getById(id:number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getByGenero(genero:string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/genero/${genero}`);
  }

  getJuegosNuevos(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/new/nuevos`);
  }

  agregarJuego(juego:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/agregar`, juego)
  }

  eliminarJuego(id:number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${id}`);
  }
}
