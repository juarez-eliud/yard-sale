import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date): string {
    //Retorna el tiempo transcurrido de una fecha
    return formatDistance(new Date(), value);
  }

}
