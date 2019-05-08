import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import {  Meter } from '../models/meter';


@Injectable({
  providedIn: 'root'
})
export class AnaliticaService {

  constructor(private http:HttpClient) { }

  getAnaliticsHotWater(userId):Observable<Meter[]>{
    return this.http.post<Meter[]>('/api/analitica/hotwater',{userId:userId});
  }
  getAnaliticsCoolWater(userId):Observable<Meter[]>{
    return this.http.post<Meter[]>('/api/analitica/coolwater',{userId:userId});
  }
  getAnaliticaElectrica(userId):Observable<Meter[]>{
    return this.http.post<Meter[]>('/api/analitica/electrics',{userId:userId})
  }
  getAnaliticaHeating(userId):Observable<Meter[]>{
    return this.http.post<Meter[]>('/api/analitica/heating',{userId:userId});
  }
}
