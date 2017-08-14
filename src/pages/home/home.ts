import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {ShiftInterface} from "../../interfaces/shift";
import {ShiftProvider} from "../../providers/shift/shift";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  activeShift: ShiftInterface;
  activeTime: number = 0;

  activePauseSeconds: number = 0;

  working = false;

  workInterval: any;
  pauseInterval: any;

  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController,
              private shiftProvider: ShiftProvider) {
    shiftProvider.getAll().then(shifts => {
      this.activeShift = shiftProvider.getActive();
      console.log('Active shift: ', this.activeShift)
      console.log(shifts)

      if (this.activeShift.active) {
        this.start();
      }
    })
  }

  startNew() {
    this.shiftProvider.startShift(Date.now()).then(() => {
      this.activeShift = this.shiftProvider.getActive();
      this.start();
    });
  }

  start() {
    this.workInterval = setInterval(() => {
      if (!this.activeShift.paused) {
        this.activeTime = (Date.now() - this.activeShift.startTime - this.activeShift.pauseTime);
      }
    }, 1000);
    this.activeTime = this.activeShift.activeTime;
    this.working = true;
  }

  stop() {
    this.shiftProvider.endShift(Date.now()).then(() => {
      this.working = false;
      this.activeTime = 0;
      this.activePauseSeconds = 0;

      clearInterval(this.workInterval);

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
      this.shiftProvider.unPauseShift(Date.now()).then(() => {
        clearInterval(this.pauseInterval);
      });
    } else {
      this.shiftProvider.pauseShift(Date.now()).then(() => {
        this.activePauseSeconds = 0;

        this.pauseInterval = setInterval(() => {
          this.activePauseSeconds = (Date.now() - this.activeShift.pauseStart);
        }, 1000)
      })
    }
  }
}
