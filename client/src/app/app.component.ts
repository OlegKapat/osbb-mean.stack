import { Component, OnInit } from '@angular/core';
import { AuthService } from './totalmainpage/shared/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  constructor(private auth:AuthService){}

  ngOnInit() {
    const potentialTokenForUser=localStorage.getItem('auth-token')
      if(potentialTokenForUser !==null) {
          this.auth.setToken(potentialTokenForUser);
      }
    const potentialTokenForManager=localStorage.getItem('manager-token')
    if(potentialTokenForManager !==null){
      this.auth.setTokenForManager(potentialTokenForManager);
    }
  }
}
