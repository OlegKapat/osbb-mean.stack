import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repair } from 'src/app/user/shared/models/repear';


@Injectable({
  providedIn: 'root'
})
export class RepearService {

  constructor(private http:HttpClient) { }

  get():Observable<Repair[]>{
    return this.http.get<Repair[]>('/api/trouble')
  }
  getById(id):Observable<Repair>{
    return this.http.get<Repair>(`/api/trouble/${id}`)
  }
  savechanges(id:number,cause:string,status:boolean):Observable<Repair>{

    return this.http.patch<Repair>(`/api/trouble/${id}`,{cause:cause,status:status})
  }
}
