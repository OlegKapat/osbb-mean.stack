import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShowusersService {

  constructor(private http:HttpClient) { }
   getUsers():Observable<User[]>{
     return this.http.get<User[]>('/api/userauth')

   }
}
