import {Component} from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {ShiftInterface} from "../../interfaces/shift";
import {ShiftProvider} from "../../providers/shift/shift";

class DateProvider {
  static now(): number {
    return Date.now();
  }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  activeShift: ShiftInterface;
  activeTime: number = 0;

  activePauseSeconds: number = 0;

  working = false;
  contracts: string[] = [];

  workInterval: any;
  pauseInterval: any;

  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController,
              private shiftProvider: ShiftProvider,
              private alertCtrl: AlertController) {
    shiftProvider.getAll().then(shifts => {
      this.activeShift = this.shiftProvider.activeShift;
      console.log(shifts)

      if (this.activeShift.active) {
        this.start();
        if (this.activeShift.paused) {
          this.pauseInterval = setInterval(() => {
            this.activePauseSeconds = (DateProvider.now() - this.activeShift.pauseStart);
            this.activeTime = (DateProvider.now() - this.activeShift.startTime
              - this.activeShift.pauseTime - this.activePauseSeconds);
          }, 1000)
        }
      }

      this.contracts = this.shiftProvider.getContracts();
    })
  }

  startNew() {
    this.shiftProvider.startShift(DateProvider.now(), this.activeShift.contract).then(() => {
      this.start();
    });
  }

  start() {
    clearInterval(this.workInterval)
    this.workInterval = setInterval(() => {
      if (!this.activeShift.paused) {
        this.activeTime = (DateProvider.now() - this.activeShift.startTime - this.activeShift.pauseTime);
      }
    }, 1000);
    this.activeShift = this.shiftProvider.activeShift;
    this.activeTime = this.activeShift.activeTime;
    this.working = true;
    console.log('Active shift: ', this.activeShift)

  }

  stop() {
    this.shiftProvider.endShift(DateProvider.now()).then(() => {
      this.working = false;
      this.activeTime = 0;
      this.activePauseSeconds = 0;

      clearInterval(this.workInterval);
      clearInterval(this.pauseInterval);

      let toast = this.toastCtrl.create({
        message: 'Shift saved!',
        position: 'top',
        showCloseButton: true,
        duration: 3000
      });
      toast.present();
    }, error => {
      let toast = this.toastCtrl.create({
        message: 'Error when saving shift: ' + error,
        duration: 9000
      });
      toast.present();
    });
  }

  pause() {
    if (this.activeShift.paused) {
      this.shiftProvider.unPauseShift(DateProvider.now()).then(() => {
        clearInterval(this.pauseInterval);
      });
    } else {
      this.shiftProvider.pauseShift(DateProvider.now()).then(() => {
        this.activePauseSeconds = 0;
        clearInterval(this.pauseInterval);

        this.pauseInterval = setInterval(() => {
          this.activePauseSeconds = (DateProvider.now() - this.activeShift.pauseStart);
        }, 1000)
      })
    }
  }

  addContract() {
    let prompt = this.alertCtrl.create({
      title: 'Add contract',
      message: "Enter a name for the new contract.",
      inputs: [
        {
          name: 'contract',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.activeShift.contract = data.contract;
            this.contracts = this.shiftProvider.getContracts();
          }
        }
      ]
    });
    prompt.present();
  }
}
