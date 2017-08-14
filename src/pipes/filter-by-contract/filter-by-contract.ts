import { Pipe, PipeTransform } from '@angular/core';
import {ShiftInterface} from "../../interfaces/shift";

@Pipe({
  name: 'filterByContract',
  pure: false,
})
export class FilterByContractPipe implements PipeTransform {
  transform(shifts: ShiftInterface[], contract) {
    return shifts.filter(s => s.contract === contract);
  }
}
