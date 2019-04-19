import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meter } from '../models/meter';

@Injectable({
  providedIn: 'root'
})
export class CoolwaterService {

  constructor(private http:HttpClient) { }
  addValue(item:Meter):Observable<Meter>{
        return this.http.post<Meter>('/api/coolwater',item)
      }
  getValue():Observable<Meter[]>{
      return this.http.get<Meter[]>(`/api/coolwater`)
      }
}
