import {Component, Input} from '@angular/core';
import {ShiftInterface} from "../../interfaces/shift";

/**
 * Generated class for the ShiftListItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'shift-list-item',
  templateUrl: 'shift-list-item.html'
})
export class ShiftListItemComponent {

  @Input()
  shift: ShiftInterface;

  constructor() {
  }

}
