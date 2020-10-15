import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let ret = value.replace(/\D+/g, '');
    if (ret == null || ret.length == 0) {
      ret = ""
    } else if (ret.length <= 2) {
      ret = ret.replace(/^(\d{0,2})/, '($1');
    } else if (ret.length <= 7) {
      ret = ret.replace(/^(\d{0,2})(\d{0,5})/, '($1) $2');
    } else {
      ret = ret.replace(/^(\d{0,2})(\d{0,5})(.*)/, '($1) $2-$3');
    }
    if (ret.length > 15) {
      ret = ret.slice(0, 15);
    }
    return ret;
  }

}
