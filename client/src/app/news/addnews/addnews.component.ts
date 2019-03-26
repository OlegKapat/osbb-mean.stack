import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { of, Subscription } from 'rxjs';

import { NewsService } from 'src/app/totalmainpage/shared/services/news.services';
import { News } from 'src/app/totalmainpage/shared/interfaces';
import { ToastService } from 'src/app/totalmainpage/shared/services/toast.service';



@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.component.html',
  styleUrls: ['./addnews.component.css']
})
export class AddnewsComponent implements OnInit,OnDestroy {
   @ViewChild('add') add:ElementRef;
   @ViewChild('remove') remove:ElementRef;
   @ViewChild('update') update:ElementRef;
  news:News;
  form:FormGroup;
  image:File;
  imagePrevie: string | ArrayBuffer;
  aSub:Subscription;

  constructor(private newsservice:NewsService, private route:ActivatedRoute, private toastServise:ToastService) {  }

  ngOnInit() {
  this.form=new FormGroup({
    title:new FormControl(null,Validators.required),
    body:new FormControl(null,Validators.required),
    imageSrc:new FormControl()

  })
  this.route.params.pipe(switchMap((params:Params)=>{
    if(params['id']){
      return this.newsservice.getNewsById(params['id'])
    } else{
      return of(null)
    }
}))
.subscribe((news)=>{
 this.news=news;
    if(news){
      this.imagePrevie=news.news.imageSrc

        this.form.patchValue({
          title:news.news.title,
          body:news.news.body
        })
        console.log(this.news);

    }
},error=>{
 this.toastServise.Info(error.error.message)

}
)
  }
 onFileUpload(event:any){              // загрузка зображення
    const file=event.target.files[0];
    this.image=file;

    const reader=new FileReader()
    reader.onload=()=>{
      this.imagePrevie=reader.result;
    }
    reader.readAsDataURL(file)
 }
onSubmit() {
    this.aSub=this.newsservice.createNews(this.form.value.title, this.form.value.body, this.image).subscribe((news)=>{
    if(news){
      this.add.nativeElement.click=this.toastServise.Success(`Замітка \"${news.title}"\ створена`);
    }
  },error=>{
    this.toastServise.Info(error.error.message);

  }
  ), this.reset();
}
ngOnDestroy(){
  if(this.aSub){
    this.aSub.unsubscribe();
  }
}
reset(){
  this.form.reset();
  this.imagePrevie=null;
}
updateNews(){
  this.aSub=this.newsservice.updateNews(this.route.snapshot.params['id'], this.form.value.title, this.form.value.body,this.image)
  .subscribe((news)=>{this.news=news, this.remove.nativeElement.click=this.toastServise.Success(`Замітка \"${news.title}"\ змінена вдало`)},error=> this.toastServise.Info (error.error.message));

  this.reset();
}
deleteNews(){
this.aSub=this.newsservice.deleteNews(this.route.snapshot.params['id']).subscribe((response)=>{(response.message),this.remove.nativeElement.click=this.toastServise.Warning('Видалення вдале')});
}

}
