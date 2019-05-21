import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/totalmainpage/shared/services/auth.service';
import { Repair } from '../../shared/models/repear';

import { Subscription } from 'rxjs';
import { RepearorderService } from '../../shared/services/repearorder.service';
import { ToastService } from 'src/app/totalmainpage/shared/services/toast.service';

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css']
})
export class OrderformComponent implements OnInit,OnDestroy {
  orderstatus:boolean=true;
  textstatus:string;
  managerauth:boolean;
  aSub:Subscription;
  form:FormGroup;
  constructor(private auth:AuthService, private orderforrepair:RepearorderService, private toastservise:ToastService) { }

  ngOnInit() {
     this.textstatus=this.orderstatus ? "відкрита" : "закрита";
     this.managerauth=this.auth.isAuthenticatedForManger();

     this.form=new FormGroup({
       name:new FormControl('',Validators.required),
       flat:new FormControl('',[Validators.required,Validators.pattern(/^(\d){1,3}$/)]),
       phone:new FormControl('',Validators.required),
       specialist:new FormControl(''),
       description: new FormControl('',Validators.required),
       cause: new FormControl(),
       status:new FormControl()
     })
  }
  onSubmit(){
    const sendform:Repair={
         name:this.form.value.name,
         flat:this.form.value.flat,
         phone:this.form.value.phone,
         specialist:this.form.value.specialist,
         description:this.form.value.description,
         cause:'',
         userId:localStorage.getItem('userId'),
         date:Date.now(),
         status:this.orderstatus
    }

      this.aSub=this.orderforrepair.addOrderForRepear(sendform).subscribe((data:Repair)=>{
        if(data){
            this.toastservise.Success("Заявка на виклик майстра відправлена")
        }
      }),error=>{
        this.toastservise.Success(`Помилка надсилання ${error.error.message} перевірте поля для заповнення`)
      }
      this.form.reset();
  }
  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe();
    }
  }
}
