import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meter } from '../models/meter';
import { Response } from 'selenium-webdriver/http';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CoolwaterService {

  constructor(private http:HttpClient) { }
  addValue(item:Meter):Observable<Meter>{
        return this.http.post<Meter>('/api/coolwater/add',item)
      }
  getValueByUserId(userId):Observable<Meter[]>{
      return this.http.post<Meter[]>(`/api/coolwater/get`,{userId:userId})
      }
}
