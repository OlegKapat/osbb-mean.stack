import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs'
import { VoteService } from '../../shared/vote.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { Vote } from '../../shared/model';
import { ToastService } from 'src/app/totalmainpage/shared/services/toast.service';

@Component({
  selector: 'app-addvote',
  templateUrl: './addvote.component.html',
  styleUrls: ['./addvote.component.css']
})
export class AddvoteComponent implements OnInit,OnDestroy {
  form:FormGroup;
  aSub:Subscription;
  constructor(private voteservice:VoteService, private toastservice:ToastService) { }

  ngOnInit() {
    this.form=new FormGroup({
      title:new FormControl()
    })
  }
  onSubmit(){
    const vote:Vote={
      title:this.form.value.title,
      date:Date.now(),
      userId:[],
      numbervote:0
    }

     this.aSub= this.voteservice.createVote(vote).subscribe((data)=>{
        if(data){
          this.toastservice.Success("Питання для голосування створено")
        }
      }), error=>{
        this.toastservice.Success(`Помилка створення ${error.error.message}`)
      }
      this.form.reset()
  }
  ngOnDestroy(){
      if(this.aSub){
        this.aSub.unsubscribe();
      }
  }

}
