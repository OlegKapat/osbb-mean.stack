import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vote } from 'src/app/manager/shared/model';
import { Subscription, of, Observable } from 'rxjs';
import { VotingService } from '../../shared/services/voting.service'
import { ActivatedRoute, Params } from '@angular/router';
import { ToastService } from 'src/app/totalmainpage/shared/services/toast.service';
import { switchMap } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit, OnDestroy {
  allData:Vote[]=[];
  aSub:Subscription;
  userId:any;
  arrayUsersId:number[];
  numbervote:number;
  isVote:boolean=false;
 
  constructor(private voteservice:VotingService,private route:ActivatedRoute, private toastservice:ToastService ) { }

  ngOnInit() {
     this.voteservice.getAll().subscribe((data:Vote[])=>{
       this.allData=data;
     })
      this.userId=localStorage.getItem('userId');

  }
   ngOnDestroy(){
     if(this.aSub){
       this.aSub.unsubscribe();
     }
   }
   voteEvent(id,numbervote,usersId){
    this.numbervote=numbervote+1;
    this.arrayUsersId=usersId;
    const isvote=this.arrayUsersId.find(x=>x == this.userId);
     if(isvote){
       this.toastservice.Success("Вы вже голосували за це питання")
     }
     else{
      this.arrayUsersId.push(this.userId);
      this.voteservice.sendVoteById(id,this.numbervote,this.arrayUsersId)
      .subscribe((data)=>{
        if(data){
         this.toastservice.Success("Ваш голос зарахований")
        }
        else{
          throw new Error("Не вірний медод голосування")
        }
      }),
      error=>{this.toastservice.Success(`${error.error.message}`)}
     }

   }
}
