import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, OnDestroy } from '@angular/core';
import { AnaliticaService } from '../../shared/services/analitica.service';
import {  Meter } from '../../shared/models/meter';
import {Chart} from 'chart.js'
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/totalmainpage/shared/services/toast.service';
import *  as moment from 'moment';

interface Some{
  first:Date,
  second:number
}
@Component({
  selector: 'app-analitica',
  templateUrl: './analitica.component.html',
  styleUrls: ['./analitica.component.css']
})
export class AnaliticaComponent implements OnInit,AfterContentInit,OnDestroy {
  @ViewChild('hotwater') hotwaterRef:ElementRef;
  @ViewChild('coolwater') coolwaterRef:ElementRef;
  @ViewChild('electric') electricRef:ElementRef;
  @ViewChild('heat') heatRef:ElementRef;
  totalDataHotWater:Meter[]=[];
  totalDataCoolWater:Meter[]=[];
  totalDataElectrica:Meter[]=[];
  totalDataHeating:Meter[]=[];
  data:number[]=[];
  date:Date[]=[];
  dataCoolWater:number[]=[];
  dateCoolWater:Date[]=[];
  dataElectrica:number[]=[];
  dateElectrica:Date[]=[];
  dataHeating:number[]=[];
  dateHeating:Date[]=[];
  aSub:Subscription;

  constructor(private analiticservice:AnaliticaService, private toastservice:ToastService) { }


  ngAfterContentInit(){
        this.chartForHotWater();
        this.chartForCoollWater();
        this.chartForElectrica();
        this.chartForHeating();
  }
  ngOnInit() {

  }
  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  chartForHotWater(){
    const chartdata:any={
      label:'Гаряча вода',
      color:'rgb(255,199,99)'

    }
    this.aSub=this.analiticservice.getAnaliticsHotWater().subscribe((data:Meter[])=>{
       this.totalDataHotWater=data
       for(let i=0; i < this.totalDataHotWater.length;i++){
            this.data.push(this.totalDataHotWater[i].diference)
            this.date.push(this.totalDataHotWater[i].date)
       }
       chartdata.labels= this.date;
       chartdata.data=this.data;
       const context=this.hotwaterRef.nativeElement.getContext('2d');
       context.height='300px';
       new Chart(context,createChartConfig(chartdata))
     }),error=>{
       this.toastservice.Success(`Помилка завантаження даних ${error.error.message}`)
     }
  }
  chartForCoollWater(){
    const chartdata:any={
      label:"Холодна вода",
      color:'rgb(255,199,99)'
    }
   this.aSub= this.analiticservice.getAnaliticsCoolWater().subscribe((data:Meter[])=>{
        this.totalDataCoolWater=data
        for(let i=0; i<this.totalDataCoolWater.length;i++){
            this.dataCoolWater.push(this.totalDataCoolWater[i].diference);
            this.dateCoolWater.push(this.totalDataCoolWater[i].date)
        }
        chartdata.labels= this.dateCoolWater;
        chartdata.data=this.dataCoolWater;
        const context=this.coolwaterRef.nativeElement.getContext('2d');
        context.height='300px';
        new Chart(context,createChartConfig(chartdata))
    }),error=>{
      this.toastservice.Success(`Помилка завантаження даних ${error.error.message}`)
    }
  }
  chartForElectrica(){
    const chartdata:any={
      label:'Електроенергія',
      color:'rgb(255,199,99)'

    }
    this.aSub=this.analiticservice.getAnaliticaElectrica().subscribe((data:Meter[])=>{
       this.totalDataElectrica=data
       for(let i=0; i < this.totalDataElectrica.length;i++){
            this.dataElectrica.push(this.totalDataElectrica[i].diference)
            this.dateElectrica.push(this.totalDataElectrica[i].date)
       }
       chartdata.labels= this.dateElectrica;
       chartdata.data=this.dataElectrica;
       const context=this.electricRef.nativeElement.getContext('2d');
       context.height='300px';
       new Chart(context,createChartConfig(chartdata))
     }),error=>{
       this.toastservice.Success(`Помилка завантаження даних ${error.error.message}`)
     }
  }
  chartForHeating(){
    const chartdata:any={
      label:'Опалення',
      color:'rgb(255,199,99)'

    }
    this.aSub=this.analiticservice.getAnaliticaHeating().subscribe((data:Meter[])=>{
       this.totalDataHeating=data
       for(let i=0; i < this.totalDataHeating.length;i++){
            this.dataHeating.push(this.totalDataHeating[i].diference)
            this.dateHeating.push(this.totalDataHeating[i].date)
       }
       chartdata.labels= this.dateHeating;
       chartdata.data=this.dataHeating;
       const context=this.heatRef.nativeElement.getContext('2d');
       context.height='300px';
       new Chart(context,createChartConfig(chartdata))
     }),error=>{
       this.toastservice.Success(`Помилка завантаження даних ${error.error.message}`)
     }
  }
}
function createChartConfig({labels,color,label,data}){

  return {
    type:'line',
    options:{
      responsive:true,
    },
    data:{
      labels,
      datasets:[{
        label,
        data,
        borderColor:color,
        stepedLine:false,
        fill:false
      }]
    }

  }
}
