import { makeAutoObservable } from 'mobx';

export class AuthStore {

  private _isUserLoggedIn = true
  userName: string

  constructor() {
    makeAutoObservable(this)
  }

  get isUserLoggedIn(): boolean {
    return this._isUserLoggedIn;
  }

  set isUserLoggedIn(value: boolean) {
    this._isUserLoggedIn = value;
  }
}
