import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class AutenticacionService {

http = inject(HttpClient);

constructor(private route:HttpClient){}

registrarse(data:any): Observable<any>{
  return this.http.post(`${environment.api_url}/usuario/signup`, data);
}

login(data:{email:string, contrasenia:string}): Observable<any>{
  return this.http.post(`${environment.api_url}/usuario/login`, data);
}

guardarUsuarioEnSesion(usuario:any){
  localStorage.setItem('USUARIO', JSON.stringify(usuario))
}

getUsuarioEnSesion(){
  return JSON.parse(localStorage.getItem('USUARIO') || 'null');
}

logout(){
  localStorage.removeItem('USUARIO');
}

}
