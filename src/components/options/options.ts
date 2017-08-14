import { Component } from '@angular/core';
import {ShiftProvider} from "../../providers/shift/shift";
import {AlertController, ToastController} from "ionic-angular";

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
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
  }

  deleteAll() {
    let confirm = this.alertCtrl.create({
      title: 'Really delete all shifts?',
      message: '<strong>This action cannot be undone!</strong>',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.shiftProvider.deleteAll().then(() => {
              let toast = this.toastCtrl.create({
                message: 'Shifts deleted!',
                position: 'top',
                showCloseButton: true,
                duration: 3000
              });
              toast.present();
            })
          }
        }
      ]
    });
    confirm.present();
  }
}
