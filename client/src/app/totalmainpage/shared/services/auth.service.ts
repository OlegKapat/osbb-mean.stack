import { Injectable } from '@angular/core';
import { LoginUser, RegistrationUser, LoginManager } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class AuthService  {
    constructor(private http:HttpClient){}

    private token=null;
    private managertoken=null;
    private userId;
    private userName='';

    login(user:LoginUser):Observable<{token:string,userId:string,userName:string}> {
       return this.http.post<{token:string, userId:string,userName:string}>('/api/userauth/login',user).pipe(tap(({token,userId,userName})=>{
          localStorage.setItem('auth-token',token)
          localStorage.setItem('userId',userId)
          sessionStorage.setItem('userName',userName)
          this.setToken(token)
       }))
    }
    loginmanager(user:LoginManager):Observable<{managertoken:string}>{
      return this.http.post<{managertoken:string}>('/api/managerauth/login',user).pipe(tap(({managertoken})=>{
        localStorage.setItem('manager-token',managertoken)
        this.setTokenForManager(managertoken);
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
      sessionStorage.clear();
    }
    register(registeruser:RegistrationUser):Observable<RegistrationUser>{
      return this.http.post<RegistrationUser>('/api/userauth/register', registeruser).pipe(catchError(error=>{
        return throwError(error);
      }))
    }
    getAuthId(){
      if(this.token || this.managertoken){
       return this.userId
      }
      else{
        console.log("Не зареестрований");
      }
    }
    getName(){
      return this.userName=sessionStorage.getItem('userName')
    }
 }
