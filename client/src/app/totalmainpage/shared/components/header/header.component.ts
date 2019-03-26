import { Component, OnInit, AfterViewInit, OnDestroy, } from '@angular/core';
import { FormControl,Validators,FormGroup,FormBuilder} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit,OnDestroy,AfterViewInit {

  constructor(private auth:AuthService, private router:Router,
              private route:ActivatedRoute) { }

  form1:FormGroup;
  form2:FormGroup;
  form3:FormGroup;
  sub:Subscription;
  sub1:Subscription;
  sub2:Subscription;
  isUserAuthentificate=false;
  isManagerAuthentificate=false;
  ngOnInit() {
    this.form1=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)])
    })

      this.form2= new FormGroup ({
      name:new FormControl(null,Validators.required),
      flat:new FormControl(null,[Validators.required,Validators.pattern(/^(\d){1,3}$/)]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)])
    });
    this.form3=new FormGroup({
      login:new FormControl(null,Validators.required),
      password:new FormControl(null, [Validators.required,Validators.minLength(6)])
    });

     this.route.queryParams.subscribe((params:Params)=>{
        if(params['registered']){
          // Попадаэмо в систему під своїми данними

        }
        else if(params['accessDenied']){
          // Потрібно авторезуватись
        }
     })

  }
  ngAfterViewInit(){

    this.isUserAuthentificate=this.auth.isAuthenticated();
    this.isManagerAuthentificate=this.auth.isAuthenticatedForManger();
  }
  onSubmit() {

    const loginuser= {
      email:this.form1.value.email,
      password:this.form1.value.password
    }
    this.sub=this.auth.login(loginuser).subscribe(()=>this.router.navigate(['/'],{
      queryParams:{
        registered:true
      }
    }),
    error=> {
      console.warn(error);
      this.form1.enable();
    }

    )
    this.form1.reset();
  }
  submitmanager(){

    const managerlogin={
      login:this.form3.value.login,
      password:this.form3.value.password
    }
    this.sub2=this.auth.loginmanager(managerlogin).subscribe(()=>this.router.navigate(['/'],{
      queryParams:{
        registered:true
      }
    })),
    // tslint:disable-next-line:no-unused-expression
    error=>{
      console.warn(error);
      this.form3.enable();
    };
    this.form3.reset();
  }
  submit(){
    this.form2.disable();
    const registerform= {
      name:this.form2.value.name,
      flat:+this.form2.value.flat,
      email:this.form2.value.email,
      password:this.form2.value.password
    }
   this.sub1= this.auth.register(registerform).subscribe(()=>{
      //  this.router.navigate(['/'])
       this.form2.reset();
      console.log('Реєстрація пройшла вдало');

    },error=>{
      console.warn(`Невдала реестрація ${error}`)
      this.form2.enable();

    }
    )
  }

  ngOnDestroy(){
    if(this.sub) {
      this.sub.unsubscribe();
    }
    else if(this.sub1) {
      this.sub1.unsubscribe();
    }
    else if(this.sub2){
      this.sub2.unsubscribe();
    }
  }
  logOut(){
    this.auth.logOut();
    this.auth.logOutForManager();
  }
}
