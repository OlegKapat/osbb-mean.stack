import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repair } from '../models/repear';

@Injectable({
  providedIn: 'root'
})
export class RepearorderService {

  constructor(private http:HttpClient) { }
  addOrderForRepear(item):Observable<Repair>{
    return this.http.post<Repair>('/api/orderforrepair',item);


  }
}
