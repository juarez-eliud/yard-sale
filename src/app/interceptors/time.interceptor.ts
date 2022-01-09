import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/* indica si funciona o no funciona el interceptor, puede inicializar en true
y en la función para habilitarla (checkTime()) establecer false para que todas las 
peticiones sean interceptadas y solo se configuraría las que no se requieren que se 
ejecute el interceptor */
const CHECK_TIME = new HttpContextToken<boolean>(() => false);

//Función que habilita o no la ejecución del interceptor
export function checkTime(){
  return new HttpContext().set(CHECK_TIME, true)
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  /* La función del time interceptor es que cada vez que haya
    una petición evalue la hora en la que inició y en la que finalizó */    

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    /* Se evalua si el contexto está habilitado, 
    si es que sí entonces se ejecuta toda la logica de negocio */
    if (request.context.get(CHECK_TIME)) {
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
      //Esto se ejecuta después de cada petición
    }
    return next.handle(request);
  }
}
