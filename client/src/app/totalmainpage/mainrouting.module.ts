import { NgModule } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { ContactyComponent } from './contacty/contacty.component'
import { NewsComponent } from '../news/news.component';
import { AddnewsComponent } from '../news/addnews/addnews.component';
import { UsermenuComponent } from './usermenu/usermenu.component';



const route:Routes= [
  {path:'',component:MainComponent,children:[
     {path:'',component:MainpageComponent},
     {path:'about',component:AboutComponent},
     {path:'contacty',component:ContactyComponent},
     {path:'news',component:NewsComponent,children:[
       {path:':id',component:AddnewsComponent,}
     ] },
     {path:'user',component:UsermenuComponent}
     ]}




];

@NgModule({
  declarations:[],
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule]

})
export class MainRoutingModule {}

