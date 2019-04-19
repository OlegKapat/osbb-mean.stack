import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import {  Meter } from '../models/meter';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AnaliticaService {

  constructor(private http:HttpClient) { }

  getAnaliticsHotWater():Observable<Meter[]>{
    return this.http.get<Meter[]>('/api/analitica/hotwater');
  }
  getAnaliticsCoolWater():Observable<Meter[]>{
    return this.http.get<Meter[]>('/api/analitica/coolwater');
  }
  getAnaliticaElectrica():Observable<Meter[]>{
    return this.http.get<Meter[]>('/api/analitica/electrics')
  }
  getAnaliticaHeating():Observable<Meter[]>{
    return this.http.get<Meter[]>('/api/analitica/heating');
  }
}
