import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-timezone';
import 'moment/locale/fr';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date): string {
    moment.locale('fr');
    const date = moment(value);

    const timeZone = moment.tz.guess();

    const userLocale = navigator.language;

    return date.tz(timeZone).locale(userLocale).format('L LT');
  }
}
