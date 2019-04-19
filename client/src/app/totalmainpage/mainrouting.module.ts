import { NgModule } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { ContactyComponent } from './contacty/contacty.component'
import { NewsComponent } from '../news/news.component';
import { AddnewsComponent } from '../news/addnews/addnews.component';
import { UsermenuComponent } from '../user/usermenu/usermenu.component';
import { HotwaterComponent } from '../user/usermenu/meter/hotwater/hotwater.component';
import { CoolwaterComponent } from '../user/usermenu/meter/coolwater/coolwater.component';
import { ElectricComponent } from '../user/usermenu/meter/electric/electric.component';
import {HeatingComponent } from '../user/usermenu/meter/heating/heating.component'
import { AnaliticaComponent } from '../user/usermenu/analitica/analitica.component';
import { OrderformComponent  } from '../user/usermenu/orderform/orderform.component'

const route:Routes= [
  {path:'',component:MainComponent,children:[
     {path:'',component:MainpageComponent},
     {path:'about',component:AboutComponent},
     {path:'contacty',component:ContactyComponent},
     {path:'news',component:NewsComponent,children:[
       {path:':id',component:AddnewsComponent,}
     ] },
     {path:'usermenu',component:UsermenuComponent,children:[
       {path:'hotwater', component:HotwaterComponent},
       {path:'coolwater',component:CoolwaterComponent},
       {path:'electricity',component:ElectricComponent},
       {path:'centalheating',component:HeatingComponent },
     ]},
       {path:'analitica',component: AnaliticaComponent},
       {path:'order',component:OrderformComponent }
     ]}




];

@NgModule({
  declarations:[],
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule]

})
export class MainRoutingModule {}

