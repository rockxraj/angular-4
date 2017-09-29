import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgXCookies } from 'ngx-cookies';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private router: Router) {}
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        console.log('im under canActivate');
        if (NgXCookies.exists('login_cookie')){
            console.log('cookie exists.')
            return true;
        }
        console.log('cookie does not exist');
         this.router.navigate(['/login']);
        return false;
  }
}
