import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Meter } from '../models/meter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeatingService {

  constructor(private http:HttpClient) { }

  addItem(item:Meter):Observable<Meter>{
    return this.http.post<Meter>('/api/centralheating/add',item)
  }
  getValueById(userId):Observable<Meter[]>{
     return this.http.post<Meter[]>('/api/centralheating/get',{userId:userId});
  }

}
