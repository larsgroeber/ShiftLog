import { Component } from '@angular/core';
import {ShiftProvider} from "../../providers/shift/shift";
import {ToastController} from "ionic-angular";

/**
 * Generated class for the OptionsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'options',
  templateUrl: 'options.html'
})
export class OptionsComponent {


  constructor(private shiftProvider: ShiftProvider,
              private toastCtrl: ToastController,) {
  }

  deleteAll() {
    this.shiftProvider.deleteAll().then(() => {
      let toast = this.toastCtrl.create({
        message: 'Shifts deleted!',
        position: 'top',
        duration: 3000
      });
      toast.present();
    })
  }

}
