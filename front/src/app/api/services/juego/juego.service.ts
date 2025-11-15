import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { Observable } from "rxjs";
import { FiltrosJuego } from "../../../modules/juegos/interfaces/juego.interface";

@Injectable({
  providedIn: 'root'
})

export class JuegoService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/juego`;

  getAll(filtros : FiltrosJuego): Observable<any> {

    let params = new HttpParams();

    if (filtros.genero) {
      params = params.set('genero', filtros.genero);
    }
    if (filtros.precioMin !== undefined) {
      params = params.set('precioMin', filtros.precioMin.toString());
    }
    if (filtros.precioMax !== undefined) {
      params = params.set('precioMax', filtros.precioMax.toString());
    }

    return this.http.get<any[]>(`${this.apiUrl}`, { params });
  }

  getGeneros(): Observable<any>{
    return this.http.get<string>(`${this.apiUrl}/generos`);
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

  modificarJuego(id:number, data:any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/modificar/${id}`, data);
  }

  buscarPorNombre(nombre:string): Observable<any>{
    const params = new HttpParams().set('nombre', nombre)
    return this.http.get<any>(`${this.apiUrl}/buscar`,{params});
  }
}

