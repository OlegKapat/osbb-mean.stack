import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { Subscription,of } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { News } from '../totalmainpage/shared/interfaces';
import { AuthService } from '../totalmainpage/shared/services/auth.service';
import { NewsService } from '../totalmainpage/shared/services/news.services';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit,AfterViewInit,OnDestroy{

  news:News[]=[];
  id=null;
  aSub:Subscription;
  constructor(private newsservice:NewsService, private route:ActivatedRoute){}
  ngOnInit(){
   
  }
  ngAfterViewInit(){
    this.aSub=this.newsservice.fetch().subscribe((data)=>{this.news=data});

  }
  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe();
    }
  }
}
