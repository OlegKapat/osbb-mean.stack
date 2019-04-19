import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { News } from 'src/app/totalmainpage/shared/interfaces';
import { AuthService } from 'src/app/totalmainpage/shared/services/auth.service';
import { NewsService } from 'src/app/totalmainpage/shared/services/news.services'

@Component({
  selector: 'app-shownews',
  templateUrl: './shownews.component.html',
  styleUrls: ['./shownews.component.css']
})
export class ShownewsComponent implements OnInit,OnDestroy {

  newsarticle:News[];
  aSub:Subscription;
  constructor(private auth:AuthService, private newsservice:NewsService) { }

  ngOnInit() {
      this.getNews();

  }
  getNews(){
    this.aSub=this.newsservice.fetch().subscribe((news)=> {
      this.newsarticle=news;
     })
  }
  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe();
    }
  }

}
