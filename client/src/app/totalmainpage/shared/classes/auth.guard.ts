
import { CanActivateChild,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable,of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate,CanActivateChild {
    constructor( private auth:AuthService){}
    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>{
            if(this.auth.isAuthenticated()){
               return of(true) 
            } else {
                // визвати модуль логіна 
            }
            return of(false)
    }
    canActivateChild(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>{
        return this.canActivate(route,state);
    }
}