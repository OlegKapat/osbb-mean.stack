import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vote, Message } from './model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http:HttpClient) { }

  createVote(item:Vote):Observable<Vote>{
    return this.http.post<Vote>('/api/vote',item)
  }
  showAllVotes():Observable<Vote[]>{
    return this.http.get<Vote[]>('/api/vote');
  }
  editVote(id:number,title:string):Observable<Vote>{
    return this.http.patch<Vote>(`/api/vote/${id}`,{title:title})
  }
  deleteVote(id:number):Observable<Message>{
    return this.http.delete<Message>(`/api/vote/${id}`)
  }
}
