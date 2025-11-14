import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../../../environments/environment.development';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})

export class AutenticacionService {

http = inject(HttpClient);
router = inject(Router);

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
  const usuario = localStorage.getItem('USUARIO');
  return usuario ? JSON.parse(usuario) : null;
}

logout(){
  localStorage.removeItem('USUARIO');
  localStorage.removeItem('filtrosJuegos');
  this.router.navigate(['/login']);
}

isLoggedIn(): boolean{
  return this.getUsuarioEnSesion() !== null;
}

}
