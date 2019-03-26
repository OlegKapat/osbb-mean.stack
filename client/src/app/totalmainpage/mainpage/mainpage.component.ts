import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector:'app-mainpage',
  templateUrl:'./mainpage.componrnt.html',
  styleUrls:['./mainpage.component.css']
})
export class MainpageComponent implements OnInit,AfterViewInit{
  isLogin:boolean;
  
  constructor(private auth:AuthService) { }
  
    ngOnInit() {
      this.isLogin=(this.auth.isAuthenticated() || this.auth.isAuthenticatedForManger()) ? true :false;
    }
    ngAfterViewInit() {
     
    }
}
