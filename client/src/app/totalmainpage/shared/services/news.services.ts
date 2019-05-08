import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News, Message } from '../interfaces';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class NewsService {
  constructor(private http:HttpClient){}
  fetch():Observable<News[]>{
    return this.http.get<News[]>('/api/news')
}
   getNewsById(id:string):Observable<News>{

      return this.http.get<News>(`/api/news/${id}`);
   }
   createNews(title:string, body:string,image?:File  ) : Observable<News>{
      const formdata=new FormData();
      const date=new Date();
      if(image){
         formdata.append('image', image, image.name)
      }
      formdata.append('title', title);
      formdata.append('body',body);
      formdata.append('date',date.getDate().toString());
      return this.http.post<News>('/api/news',formdata)
   }
   updateNews(id: number,title:string, body:string, image?:File) : Observable<News>{
      const formdata=new FormData();
      if(image){
         formdata.append('image', image, image.name)
      } else
      formdata.append('title', title);
      formdata.append('body',body)
      return this.http.patch<News>(`/api/news/${id}`,formdata)
   }
   deleteNews(id:number):Observable<Message>{
     return this.http.delete<Message>(`/api/news/${id}`);
    }
  }


