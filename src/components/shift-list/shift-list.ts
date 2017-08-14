import { Component } from '@angular/core';
import {ShiftInterface} from "../../interfaces/shift";
import {ShiftProvider} from "../../providers/shift/shift";

/**
 * Generated class for the ShiftListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'shift-list',
  templateUrl: 'shift-list.html'
})
export class ShiftListComponent {

  shifts: ShiftInterface[];

  constructor(private shiftProvider: ShiftProvider) {
    this.shiftProvider.getAll().then(shifts => {
      this.shifts = this.shiftProvider.shifts;
    })
  }

}
