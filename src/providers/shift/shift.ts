import {EventEmitter, Injectable, Output} from '@angular/core';
import 'rxjs/add/operator/map';
import {ShiftInterface} from "../../interfaces/shift";
import {Storage} from "@ionic/storage";

@Injectable()
export class ShiftProvider {

  shifts: ShiftInterface[] = [];
  activeShift: ShiftInterface;

  @Output()
  shiftsUpdated: EventEmitter<ShiftInterface[]> = new EventEmitter();

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
        let a = this.shifts.find(s => s.active === true);
        if (a) {
          this.activeShift  = a;
        } else {
          this.activeShift = {
            startTime: 0,
            activeTime: 0,
            pauseTime: 0,
            pauseStart: 0,
            paused: false,
            active: false,
          };
          this.activeShift.contract = this.shifts.length > 0 ? this.shifts.slice(-1)[0].contract : '';
        }
      }, error => rej(error))
    })
  }

  getContracts(): string[] {
    let res = [];
    this.shifts.forEach(s => {
      if (s.contract && res.indexOf(s.contract) === -1) {
        res.push(s.contract);
      }
    });
    return res;
  }

  startShift(time: number, contract?: string): Promise<boolean> {
    // deep copy this.shifts, ok here because be only deal with strings and numbers
    this.shifts = JSON.parse(JSON.stringify(this.shifts));
    this.activeShift = {
      startTime: 0,
      activeTime: 0,
      pauseTime: 0,
      pauseStart: 0,
      paused: false,
      active: false,
    };
    this.activeShift.contract = contract;
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
    console.log(this.shifts);
    this.shiftsUpdated.emit(this.shifts);
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
      this.storage.set('shifts', "").then(() => {
        this.shifts = [];
        this.activeShift = {
          startTime: 0,
          activeTime: 0,
          pauseTime: 0,
          pauseStart: 0,
          paused: false,
          active: false,
        };
        this.shiftsUpdated.emit(this.shifts);
        res(true);
      }, error => rej(error));
    })
  }

  deleteShift(shift: ShiftInterface): Promise<boolean> {
    return new Promise((res, rej) => {
      const index = this.shifts.indexOf(shift);
      if (index !== -1) {
        this.shifts.splice(index, 1);
        this.save().then(() => res(true), e => rej(e));
      } else {
        res(false);
      }
    })
  }
}
