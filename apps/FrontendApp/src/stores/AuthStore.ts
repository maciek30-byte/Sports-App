import { makeAutoObservable } from 'mobx';

export class AuthStore {
  isUserLoggedIn = false;
  userName = '';

  constructor() {
    makeAutoObservable(this);
  }

  setIsUserLoggedIn(value: boolean) {
    this.isUserLoggedIn = value;
  }

  setUserName(name: string) {
    this.userName = name;
  }
}
