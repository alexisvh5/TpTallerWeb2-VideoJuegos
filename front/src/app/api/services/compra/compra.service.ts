import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CompraService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/comprar`;

  getAllComprasByUsuario(idUsuario:number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  comprarJuego(idUsuario:number, idJuego:number): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/adquirir`, {idUsuario, idJuego});
  }

  comprarTodo(idUsuario: number) {
  return this.http.post(`${this.apiUrl}/checkout`, { idUsuario });
}

}
