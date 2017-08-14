import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the HhmmssPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'hhmmss',
})
export class HhmmssPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {

    let seconds = Math.trunc(value);
    let hours = Math.floor(seconds / 3600);

    seconds -= hours*3600;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes*60;

    let hStr = hours.toString();
    let mStr = minutes.toString();
    let sStr = seconds.toString();

    if (hours   < 10) {hStr   = "0"+hours;}
    if (minutes < 10) {mStr = "0"+minutes;}
    if (seconds < 10) {sStr = "0"+seconds;}
    return hStr+':'+mStr+':'+sStr;
  }
}
