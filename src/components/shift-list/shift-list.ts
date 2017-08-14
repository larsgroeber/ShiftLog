import { Component } from '@angular/core';
import {ShiftInterface} from "../../interfaces/shift";
import {ShiftProvider} from "../../providers/shift/shift";

@Component({
  selector: 'shift-list',
  templateUrl: 'shift-list.html'
})
export class ShiftListComponent {

  shifts: ShiftInterface[];
  contracts = [];

  constructor(private shiftProvider: ShiftProvider) {
    this.shiftProvider.getAll().then(shifts => {
      this.shifts = shifts;
      this.contracts = this.shiftProvider.getContracts();
    });
    this.shiftProvider.shiftsUpdated.subscribe(shifts => {
      this.shifts = shifts;
      this.contracts = this.shiftProvider.getContracts();
    })
  }
}
