import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/totalmainpage/shared/services/auth.service';
import { ToastService } from 'src/app/totalmainpage/shared/services/toast.service';
import { Repair } from 'src/app/user/shared/models/repear';
import { RepearService } from '../shared/repear.service';

@Component({
  selector: 'app-showrepear',
  templateUrl: './showrepear.component.html',
  styleUrls: ['./showrepear.component.css']
})
export class ShowrepearComponent implements OnInit,AfterViewInit {
  aSub:Subscription;
  form:FormGroup;
  textstatus:string;
  managerauth:boolean;
  allRepair:Repair[]=[];
  curentId:number;
  name :string; description:string;cause:string;phone:string;userId:string;specialist:string;
  flat:number;
  status:boolean;
  constructor(private auth:AuthService, private toastservise:ToastService, private showperair:RepearService) {}

  ngOnInit() {

     this.managerauth=this.auth.isAuthenticatedForManger();
     this.showperair.get().subscribe(data=>this.allRepair=data)
     this.form=new FormGroup({
      name:new FormControl(null),
      flat:new FormControl(null),
      phone:new FormControl(null),
      specialist:new FormControl(null),
      description: new FormControl(null),
      cause: new FormControl(null),
      status:new FormControl(null)

  })

}
showtrouble(id){
  this.curentId=id;
    this.showperair.getById(id).subscribe(data=>{
       let {name,flat,phone,specialist,description,cause,status}=data;
       this.name=name
       this.flat=flat
       this.phone=phone
       this.specialist=specialist
       this.description=description
       this.cause=cause
       this.status=status

    })
    this.textstatus=this.status ? "закрита" : "відкрита";
 }
 ngAfterViewInit(){

 }
 saveresult(){
   this.showperair.savechanges(this.curentId,this.form.value.cause,this.form.value.status).subscribe(data=>{
     if(data){
       this.toastservise.Success("Заявка виконана")


     }
   }

   ),error=>{
     this.toastservise.Success(error.error.message)
   };

 }
}
