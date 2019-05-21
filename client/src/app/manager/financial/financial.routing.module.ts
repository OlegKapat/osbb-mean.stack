import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CteateosbbComponent } from './articles/createosbb/createosbb.component';
import { FinancialComponent } from './financial.component';
import { ActisbbComponent } from './articles/actiosbb/actiosbb.component';


const route:Routes=[
  {path:'',component:FinancialComponent,children:[
    {path:'createosbb',component:CteateosbbComponent},
    {path:'normativnieacti',component:ActisbbComponent}
  ]}

]
@NgModule({
  declarations:[],
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule]
})
export class FinancialRoutingModule { }
