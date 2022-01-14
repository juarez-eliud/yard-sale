import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService) { }

  canActivate(
    route: ActivatedRouteSnapshot,//Se debe de retornal un valor de acuerdo con la firma del método
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = this.tokenService.getToken();
    
    //Por defecto el guardian no permite el acceso, si tiene token le permitirá el acceso
    return token ? true : false;
  }
  
}
