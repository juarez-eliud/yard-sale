import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/users.model';
import { ControlContainer } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password});
  }

  profile(token: string) {
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
      headers: {
        Authorization: `Bearer ${token}`,
        //'Content-type': 'application/json'
      }
    });
  }

  
}
