import { Component, OnInit, OnDestroy } from '@angular/core';
import { VoteService } from '../../shared/vote.service';
import { Vote } from '../../shared/model'
import { ToastService } from 'src/app/totalmainpage/shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editvote',
  templateUrl: './editvote.component.html',
  styleUrls: ['./editvote.component.css']
})
export class EditvoteComponent implements OnInit,OnDestroy {
  showvoter:Vote[]=[];
  editField:string;
  aSub:Subscription;
  constructor(private voteservice:VoteService, private toastservice:ToastService) { }

  ngOnInit() {
    this.aSub=this.voteservice.showAllVotes().subscribe((data:Vote[])=>{this.showvoter=data})
  }
  changeValue(id:number,title:string,event:any){

    this.editField=event.target.textContent;
    this.aSub=this.voteservice.editVote(id,this.editField).subscribe(data=>{
      if(data){
        this.toastservice.Success("Змінено вдало")
      }
    })
  }
  remove(id){
    this.aSub=this.voteservice.deleteVote(id).subscribe(message=>{this.toastservice.Success(message.message)}
    )

  }
  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe();
    }
  }
}
