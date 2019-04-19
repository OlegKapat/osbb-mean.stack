import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/totalmainpage/shared/services/auth.service';

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css']
})
export class OrderformComponent implements OnInit {
  orderstatus:true;
  textstatus:string;
  managerauth:boolean;
  form:FormGroup
  constructor(private auth:AuthService) { }

  ngOnInit() {
     this.textstatus=this.orderstatus ? "закрита" : "відкрита";
     this.managerauth=this.auth.isAuthenticatedForManger();
     console.log(this.managerauth);

     this.form=new FormGroup({
       name:new FormControl('',Validators.required),
       flat:new FormControl('',[Validators.required,Validators.pattern(/^(\d){1,3}$/)]),
       phone:new FormControl('',Validators.required),
       specialist:new FormControl(''),
       description: new FormControl('',Validators.required),
       cause: new FormControl(''),
       status:new FormControl(true)
     })
  }
  onSubmit(){

  }
}
