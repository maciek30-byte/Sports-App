import { makeAutoObservable } from 'mobx';

export class WorkoutStore {

  constructor() {
    makeAutoObservable(this)
  }
}
