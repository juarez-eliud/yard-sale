import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //Se envía el request original antes de que se responda por parte del servidor
    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken();
    //Si existe el token entonces se clona el request original
    if (token) {
      const authReq = request.clone({
        //Se modifican los headers
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      //Se retorna el request ya modificado
      return authReq;
    }
    //Si no existe el token se retorna el request tal cual
    return request;
  }
}
