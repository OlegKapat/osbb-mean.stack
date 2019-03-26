import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn:'root'
})
export class TokenInterseprotForManager implements HttpInterceptor{
  constructor(private auth:AuthService){}
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
      if(this.auth.isAuthenticatedForManger()){
        console.log(req);
        req=req.clone({
          setHeaders:{
            Authorization:this.auth.getTokenForManager()
          }
        });
      }
      return next.handle(req);
  }
}
