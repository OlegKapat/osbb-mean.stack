import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../shared/interfaces/interfaces';
import { ShowusersService } from '../shared/showusers.service'
import { combineLatest, Subscription } from 'rxjs';
import { Meter } from 'src/app/user/shared/models/meter';
import { CoolwaterService } from 'src/app/user/shared/services/coolwater.service';
import { HotWaterService } from 'src/app/user/shared/services/hotwater.service';
import { ElectricService } from 'src/app/user/shared/services/electric.service';
import { HeatingService } from 'src/app/user/shared/services/heating.service'


@Component({
  selector: 'app-showmeters',
  templateUrl: './showmeters.component.html',
  styleUrls: ['./showmeters.component.css']
})
export class ShowmetersComponent implements OnInit,OnDestroy {
  user:User[]=[];
  coolwater:Meter[]=[];
  hotwater:Meter[]=[];
  electric:Meter[]=[];
  heating:Meter[]=[];
  aSub:Subscription;
  constructor(private userservice:ShowusersService,
              private coolwaterservice:CoolwaterService,
              private hotwaterservice:HotWaterService,
              private electricservice:ElectricService,
              private heatingservice:HeatingService ) { }

  ngOnInit() {
    this.userservice.getUsers().subscribe(data=>this.user=data)
  }
  showuserdata(userId){
  this.aSub= combineLatest(this.coolwaterservice.getValueByUserId(userId),
                    this.hotwaterservice.getValueById(userId),
                    this.electricservice.getValueById(userId),
                    this.heatingservice.getValueById(userId)).subscribe((data:[any,any,any,any])=>{
                        this.coolwater=data[0],
                        this.hotwater=data[1],
                        this.electric=data[2],
                        this.heating=data[3]
                    }),error=>error.error.message


  }
  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

}
