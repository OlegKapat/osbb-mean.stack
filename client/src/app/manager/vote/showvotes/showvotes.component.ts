import { Component, OnInit } from '@angular/core';
import { VoteService } from '../../shared/vote.service';
import { Vote } from '../../shared/model';

@Component({
  selector: 'app-showvotes',
  templateUrl: './showvotes.component.html',
  styleUrls: ['./showvotes.component.css']
})
export class ShowvotesComponent implements OnInit {
  showvoter:Vote[]=[];
  constructor(private voteservice:VoteService) { }

  ngOnInit() {
    this.voteservice.showAllVotes().subscribe((data:Vote[])=>{this.showvoter=data})
  }

}
