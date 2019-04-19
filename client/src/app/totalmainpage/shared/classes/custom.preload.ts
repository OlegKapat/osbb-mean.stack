import { Observable,of } from 'rxjs';
import { PreloadingStrategy,Route } from '@angular/router';

export class CustomPreload implements PreloadingStrategy{
  preload(route: Route, preload:Function): Observable<any> {
    if(route.data && route.data.preload){
      return preload()
    }
    else {
      return of(null);
    }
  }

}
