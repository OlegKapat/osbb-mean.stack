import { NgModule} from '@angular/core';
import { RouterModule,Routes,PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './totalmainpage/shared/components/404/notfound.component'
import { CustomPreload } from './totalmainpage/shared/classes/custom.preload';// підключити пізніше


 const routes:Routes=[
   {path:'main', loadChildren:'./totalmainpage/mainpage.module.ts#MainModule'},
   {path:'**', component: NotFoundComponent },

 ]
@NgModule({
  imports:[RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports:[RouterModule]
})
export class AppRoutingModule {}

