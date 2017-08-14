import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {ShiftInterface} from "../../interfaces/shift";
import {Storage} from "@ionic/storage";

const NEW_SHIFT = {
  startTime: 0,
  activeTime: 0,
  pauseTime: 0,
  paused: false,
  active: false,
};

@Injectable()
export class ShiftProvider {

  shifts: ShiftInterface[];
  private activeShift: ShiftInterface;

  constructor(private storage: Storage) {
  }

  getAll(): Promise<ShiftInterface[]> {
    return new Promise((res, rej) => {
      this.storage.get('shifts').then(shifts => {
        if (shifts) {
          this.shifts = JSON.parse(shifts);
          res(this.shifts);
        } else {
          this.shifts = [];
          res([]);
        }
      }, error => rej(error))
    })
  }

  getActive(): ShiftInterface {
    if (this.shifts === undefined) {
      console.error('Call ShiftProvider.getAll() first!');
      return;
    }
    let a = this.shifts.find(s => s.active === true);
    if (a) {
      this.activeShift  = a;
    } else {
      this.activeShift = NEW_SHIFT;
    }
    return this.activeShift;
  }

  startShift(time: number): Promise<boolean> {
    this.activeShift = NEW_SHIFT;
    this.activeShift.startTime = time;
    this.activeShift.active = true;
    this.shifts.push(this.activeShift);

    return new Promise((res, rej) => {
      this.save().then(() => {
        res(true);
      }, error => rej(error));
    });
  }

  pauseShift(time: number): Promise<boolean> {
    if (!this.activeShift.paused) {
      this.activeShift.pauseStart = time;
      this.activeShift.paused = true;
    }

    return new Promise((res, rej) => {
      this.save().then(() => {
        res(true);
      }, error => rej(error));
    });
  }

  unPauseShift(time): Promise<boolean> {
    if (this.activeShift.paused) {
      this.activeShift.pauseTime += time - this.activeShift.pauseStart;
      this.activeShift.paused = false;
    }

    return new Promise((res, rej) => {
      this.save().then(() => {
        res(true);
      }, error => rej(error));
    });
  }

  save(): Promise<boolean> {
    console.log(this.shifts)
    return new Promise((res, rej) => {
      this.storage.set('shifts', JSON.stringify(this.shifts)).then(() => res(true),
        error => rej(error));
    })
  }

  endShift(time: number): Promise<boolean> {
    return new Promise((res, rej) => {
      this.unPauseShift(time).then(() => {
        this.activeShift.active = false;

        this.activeShift.endTime = time;

        this.activeShift.activeTime = this.activeShift.endTime - this.activeShift.startTime - this.activeShift.pauseTime;

        this.save().then(() => {
          res(true);
        }, error => rej(error));
      })
    });

  }

  deleteAll(): Promise<boolean> {
    return new Promise((res, rej) => {
      this.storage.remove('shifts').then(() => {
        this.shifts = [];
        this.activeShift = NEW_SHIFT;
        res(true);
      }, error => rej(error));
    })
  }
}
