import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface OnExit {
  //Una función que debe retornar de acuerdo como es la firma
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<unknown> {
  canDeactivate(
    /* El atributo component es para manejar la lógica 
    desde el componente para permitir salir al usuario  */
    component: OnExit,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /* Si component tiene la función OnExit 
    entonces ejecutarla si no permitir salida es decir retornar true */
    return component.onExit ? component.onExit() : true;
  }
  
}
