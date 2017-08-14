import {Component, Input} from '@angular/core';
import {ShiftInterface} from "../../interfaces/shift";
import {ShiftProvider} from "../../providers/shift/shift";
import {ToastController} from "ionic-angular";

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

  constructor(private shiftProvider: ShiftProvider, private toastCtrl: ToastController) {
  }

  deleteShift() {
    this.shiftProvider.deleteShift(this.shift).then(res => {
      if (res) {
        let toast = this.toastCtrl.create({
          message: 'Shift deleted!',
          position: 'top',
          showCloseButton: true,
          duration: 3000
        });
        toast.present();
      } else {
        let toast = this.toastCtrl.create({
          message: 'Could not delete shift!',
          position: 'top',
          showCloseButton: true,
          duration: 9000
        });
        toast.present();
      }
    })
  }

}
