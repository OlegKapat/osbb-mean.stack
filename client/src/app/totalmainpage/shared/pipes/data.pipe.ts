import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
   name: 'formatDate'
})
export class DatePipe implements PipeTransform {
   transform(date: any, args?: any): any {
     let data = new Date(date);
     return moment(data).format("DD-MM-YYYY")

   }
}
