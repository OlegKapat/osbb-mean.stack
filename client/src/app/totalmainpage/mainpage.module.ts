import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule} from 'angular-bootstrap-md';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './main/main.component';
import { MainRoutingModule } from './mainrouting.module';
import { NotFoundComponent } from './shared/components/404/notfound.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AboutComponent } from './about/about.component';
import { ContactyComponent } from './contacty/contacty.component'
import { TokenInterseptor } from '../totalmainpage/shared/classes/tokeninterseptor';
import { TokenInterseprotForManager } from '../totalmainpage/shared/classes/tokeninteeseptorformanager';
import { NewsComponent } from '../news/news.component';
import { AddnewsComponent } from '../news/addnews/addnews.component';
import { ShownewsComponent } from '../news/shownews/shownews.component';
import { DatePipe } from '../totalmainpage/shared/pipes/data.pipe';
import { UsermenuComponent } from '../user/usermenu/usermenu.component';
import { HotwaterComponent } from '../user/usermenu/meter/hotwater/hotwater.component'
import { CoolwaterComponent } from '../user/usermenu/meter/coolwater/coolwater.component';
import { ElectricComponent } from '../user/usermenu/meter/electric/electric.component';
import { HeatingComponent } from '../user/usermenu/meter/heating/heating.component';
import { AnaliticaComponent } from '../user/usermenu/analitica/analitica.component';
import { OrderformComponent } from '../user/usermenu/orderform/orderform.component';
import { VoteComponent } from '../manager/vote/vote.component';
import { AddvoteComponent } from '../manager/vote/addvote/addvote.component';
import { VotingComponent } from '../user/usermenu/voting/voting.component';
import { ShowvotesComponent } from '../manager/vote/showvotes/showvotes.component';
import { EditvoteComponent } from '../manager/vote/editvote/editvote.component';
import { ShowmetersComponent } from '../manager/showmeters/showmeters.component';
import { ShowrepearComponent } from '../manager/showrepear/showrepear.component';
import { FinancialComponent } from '../manager/financial/financial.component';



@NgModule({
  declarations:[MainComponent,
                NotFoundComponent,
                MainpageComponent,
                AboutComponent,
                ContactyComponent,
                 NewsComponent,
                 AddnewsComponent,
                 ShownewsComponent,
                 DatePipe,
                 UsermenuComponent,
                 HotwaterComponent,
                 CoolwaterComponent,
                 ElectricComponent,
                 HeatingComponent,
                 AnaliticaComponent,
                 OrderformComponent,
                 VoteComponent,
                 AddvoteComponent,
                 VotingComponent,
                 ShowvotesComponent,
                 EditvoteComponent,
                 ShowmetersComponent,
                 ShowrepearComponent,
                 FinancialComponent
                ],
  imports:[MainRoutingModule,
          AngularFontAwesomeModule,
          CommonModule,
          FormsModule,
          ReactiveFormsModule,
          BrowserAnimationsModule,
          MDBBootstrapModule.forRoot()
        ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers:[ {provide:HTTP_INTERCEPTORS,multi:true,useClass:TokenInterseptor},
    {provide:HTTP_INTERCEPTORS,multi:true,useClass:TokenInterseprotForManager}]

})
export class MainModule {}

