export interface ShiftInterface {
  id?: number,
  startTime: number,
  endTime?: number,
  pauseStart?: number,
  pauseTime: number,
  activeTime: number,
  paused: boolean,
  active: boolean,
  notes?: string,
  contract?: string,
}
