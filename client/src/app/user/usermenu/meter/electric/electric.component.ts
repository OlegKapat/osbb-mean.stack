import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { Meter } from 'src/app/user/shared/models/meter';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/totalmainpage/shared/services/toast.service';
import { Router } from '@angular/router';
import { ElectricService } from 'src/app/user/shared/services/electric.service'

@Component({
  selector: 'app-electric',
  templateUrl: './electric.component.html',
  styleUrls: ['./electric.component.css']
})
export class ElectricComponent implements OnInit,AfterViewInit,OnDestroy {
  form:FormGroup;
  firstdata:number;
  databasevalue:Meter[]=[];
  currentvalue:number=null;
  diference:number=null;
  userId:string;
  lastDate:Date;
  aSub:Subscription;
  constructor(private toastservice:ToastService,
    private electricservice:ElectricService,
    private router:Router) { }

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
    const senddata:Meter={
      previous:this.form.value.previous,
      current:this.form.value.current,
      diference:this.form.value.diference,
      date: Date.now(),
      userId:localStorage.getItem('userId')
     }
      this.electricservice.addValue(senddata).subscribe((data)=>{
      if(data){
        this.toastservice.Success('Данні збережено')
      }

       },error=>{
      this.toastservice.Warning(`Помилка занесення даних ${error.error.message}` )
       }
       )
       this.form.reset()
  }
  getDiference(){
    if(this.diference>0 || this.currentvalue>this.firstdata){
      this.diference=this.currentvalue-this.firstdata

    }else{
      this.toastservice.Success('Поточні показники мають буди більше або рівні за попередні')
      this.form.get('difer').reset();
    }
}
ngAfterViewInit(){
  this.aSub = this.electricservice.getValue().subscribe(data=>{
    this.databasevalue=data;
    window.setTimeout(() => {
      let length=this.databasevalue.length;
      this.firstdata=this.databasevalue[length-1]['current'];
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
