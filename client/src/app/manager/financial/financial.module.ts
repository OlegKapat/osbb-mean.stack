
import {  NgModule } from  '@angular/core';
import {FinancialRoutingModule } from './financial.routing.module';
import { CteateosbbComponent } from './articles/createosbb/createosbb.component';
import { ActisbbComponent } from './articles/actiosbb/actiosbb.component';

@NgModule({
 declarations:[CteateosbbComponent,ActisbbComponent],
 imports:[FinancialRoutingModule],
 providers:[]

})
 export class FinantialModule{}
