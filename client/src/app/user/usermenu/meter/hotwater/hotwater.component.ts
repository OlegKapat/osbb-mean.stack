import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastService } from 'src/app/totalmainpage/shared/services/toast.service'
import { HotWaterService } from 'src/app/user/shared/services/hotwater.service';
import { Meter } from 'src/app/user/shared/models/meter';
import *  as moment from 'moment'
import { AuthService } from 'src/app/totalmainpage/shared/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-hotwater',
  templateUrl: './hotwater.component.html',
  styleUrls: ['./hotwater.component.css']
})
export class HotwaterComponent implements OnInit,AfterViewInit,OnDestroy{
form:FormGroup;
firstdata:number;
databasevalue:Meter[]=[];
currentvalue:number=null;
diference:number=null;
userId:string;
lastDate:Date;
aSub:Subscription;

  constructor( private toastservice:ToastService,
               private hotWaterService:HotWaterService,
              ) {
             }

  ngOnInit() {
  this.form=new FormGroup({
    previous:new FormControl('',Validators.pattern(/^(\d){1,6}$/)),
    current:new FormControl('', [Validators.pattern(/^(\d){1,6}$/),Validators.required]),
    diference:new FormControl('')
  })
  if(this.firstdata === 0  || 'undefined' ){
    this.firstdata=0;
  }
  }
   onSubmit(){
     const dataForSending:Meter={
      previous:this.form.value.previous,
      current:this.form.value.current,
      diference:this.form.value.diference,
      date: moment().format("MM-DD-YYYY"),
      userId:localStorage.getItem('userId')
     }
     this.aSub=this.hotWaterService.addItem(dataForSending).subscribe((data)=>{
      if(data){
        this.toastservice.Success('Данні збережено')
      }

    },error=>{
      this.toastservice.Warning(`Помилка занесення даних ${error.error.message}`)
    }
    )

   }
  getDiference(){
          if(this.diference>0 || this.currentvalue > this.firstdata){
            this.diference=this.currentvalue-this.firstdata
          }else{
            this.toastservice.Success('Поточні показники мають буди більше або рівні за попередні')
            this.form.get('difer').reset();
          }
   }
      // getId():string{
      //   return this.getUser.getAuthId();
      // }
      ngAfterViewInit(){
       this.aSub = this.hotWaterService.getItems().subscribe(data=>{
          this.databasevalue=data;
          window.setTimeout(() => {
            let length=this.databasevalue.length;
            this.firstdata=this.databasevalue[length-1]['current']
            this.lastDate=this.databasevalue[length-1]['date'];
          }, 1000);
        }),
        error=>{
          this.toastservice.Success(`Виникла помилка ${error.error.message}`)
        }
      }
      ngOnDestroy(){
        if(this.aSub){
          this.aSub.unsubscribe();
        }
      }

}
