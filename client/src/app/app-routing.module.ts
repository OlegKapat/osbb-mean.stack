import { NgModule} from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { NotFoundComponent } from './totalmainpage/shared/components/404/notfound.component'


 const routes:Routes=[
   {path:'main', loadChildren:'./totalmainpage/mainpage.module.ts#MainModule'},
   {path:'**', component: NotFoundComponent },

 ]
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule {}

