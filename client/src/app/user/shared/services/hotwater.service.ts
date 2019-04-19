import {Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Meter } from '../models/meter';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn:'root'
})
export class HotWaterService{
  constructor(private http:HttpClient){}

  addItem(item:Meter):Observable<Meter>{

    return this.http.post<Meter>('/api/hotwater',item)
  }
  getItems():Observable<Meter[]>{
    return this.http.get<Meter[]>(`/api/hotwater`)
  }
}
