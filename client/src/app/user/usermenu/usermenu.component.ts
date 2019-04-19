import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css']
})
export class UsermenuComponent implements OnInit {
  userId:string;
  constructor(private router:Router) { }

  ngOnInit() {
    this.getUserId()
  }
  getUserId(){
    this.userId=localStorage.getItem('userId')
  }

}
