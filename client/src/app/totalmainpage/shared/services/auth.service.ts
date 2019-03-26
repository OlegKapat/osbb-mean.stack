import { Injectable } from '@angular/core';
import { LoginUser, RegistrationUser, LoginManager } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class AuthService  {
    constructor(private http:HttpClient){}

    private token=null;
    private managertoken=null;

    login(user:LoginUser):Observable<{token:string}> {
       return this.http.post<{token:string}>('/api/userauth/login',user).pipe(tap(({token})=>{
          localStorage.setItem('auth-token',token)
          this.setToken(token)
       }))
    }
    loginmanager(user:LoginManager):Observable<{token:string}>{
      return this.http.post<{token:string}>('/api/managerauth/login',user).pipe(tap(({token})=>{
        localStorage.setItem('manager-token',token)
        this.setToken(token);
      }))
    }
    setToken(token:string){
        this.token=token;
    }
    setTokenForManager(managertoken:string){
        this.managertoken=managertoken;
    }
    getToken():string {
        return this.token
    }
    getTokenForManager():string{
      return this.managertoken;
    }
    isAuthenticated():boolean {
       return !!this.token // привели до булевого значення
    }
    isAuthenticatedForManger():boolean{
      return !!this.managertoken;
    }
    logOut(){
      this.setToken(null);
      localStorage.clear();
    }
    logOutForManager(){
      this.setTokenForManager(null);
      localStorage.clear();
    }
    register(registeruser:RegistrationUser):Observable<RegistrationUser>{
      return this.http.post<RegistrationUser>('/api/userauth/register', registeruser)
    }
 }
