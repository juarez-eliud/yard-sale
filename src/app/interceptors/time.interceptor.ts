import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

/* La función del time interceptor es que cada vez que haya
  una petición evalue la hora en la que inició y en la que finalizó */

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   //Obtiene el tiempo inicial
    const start = performance.now();
    /* El operador tap deja correr un proceso sin tener que modificar la respuesta
    que nos de el observable */
    return next.handle(request).pipe(
      tap(() => {
        /* Momento en el que terminó menos la hora de inicio, 
        para saberc cuanto demoró la petición */
        const time = (performance.now() - start) + 'ms';
        console.log(request.url, time);
      })
    );
  }
}
