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
    return this.http.post<Meter>('/api/centralheating',item)
  }
  getItems():Observable<Meter[]>{
     return this.http.get<Meter[]>('/api/centralheating')
  }

}
