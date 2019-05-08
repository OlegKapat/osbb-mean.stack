import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vote } from './model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http:HttpClient) { }

  createVote(item:Vote):Observable<Vote>{
    return this.http.post<Vote>('/api/vote',item)
  }
}
