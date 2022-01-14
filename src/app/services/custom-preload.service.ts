import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    /* Elige la ruta que se requiere precargar, solo las rutas que tengan
    data y dentro de data la bandera preload en true 
    entonces se realiza la precarga */
    if (route.data && route.data['preload']) {
      return load();
    }
    //Si no cumple se evía un observable vacío
    return of(null);
  }
  
  constructor() { }
}
