import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meter } from '../models/meter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectricService {

  constructor(private http:HttpClient) { }
  addValue(item:Meter):Observable<Meter>{
    return this.http.post<Meter>('/api/electricity/add',item)
  }
  getValueById(userId):Observable<Meter[]>{
  return this.http.post<Meter[]>(`/api/electricity/get`,{userId:userId})
  }

}
