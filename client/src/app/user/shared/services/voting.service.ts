import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Vote } from 'src/app/manager/shared/model';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Vote[]>{
    return this.http.get<Vote[]>('/api/vote')
  }

  sendVoteById(id,numbervote,arrayUsersId):Observable<Vote>{
      return this.http.patch<Vote>(`/api/voting/${id}/`,{numbervote:numbervote,arrayUsersId})
  }
  getById(id:string):Observable<Vote>{
    return this.http.get<Vote>(`/api/voting/${id}`);

  }

}
