import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/users.model';
import { ControlContainer } from '@angular/forms';
import { TokenService } from './token.service';
import { switchMap, tap } from 'rxjs/operators';
 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  /* Ya no es necesario pasar como parametro el token porque el objetivo
  es que el interceptor automaticamente detecte si el usuario tiene un token
  el cual estará en local storage, si existe lo tiene que agregar a la petición */
  getProfile() {
   /*  Estructura para enviar una autorización :
    Authorization: <type> <credentials>
    Ejemplo:
    Authorization: Bearer ...
    Es importante que después del tipo tenga un espacio, si no se coloca 
    no funionará la autorización */

    //Otra forma de envíar los headers
   /*  let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`); */

    return this.http.get<User>(`${this.apiUrl}/profile`, {
      /* headers: {
        Authorization: `Bearer ${token}`,
        //'Content-type': 'application/json'
      } */
    });
  }

  loginAndGetProfile(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile()),
    )
  }

  
}
