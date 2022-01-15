import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { id } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,//Se debe de retornal un valor de acuerdo con la firma del método
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.tokenService.getToken();
    /* //Por defecto el guardian no permite el acceso, si tiene token le permitirá el acceso
    if(!token) {
      this.router.navigate(['/home']);
      return false;
    }
    return true; */

    /* En vez de ir a TokenService se tiene un estado global del usuario,
    el cual sirve para no duplicar código en muchas partes, entonces
    cualquier componente, pipe, directiva podría saber cual es el estado 
    actual del usuario */
    return this.authService.user$
    .pipe(
      map(user=> {
        if(!user){
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    )
  }
  
}
