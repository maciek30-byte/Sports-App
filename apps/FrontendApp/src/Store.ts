import { makeAutoObservable } from 'mobx';
import { AuthStore } from './stores/AuthStore';

export class Store {
  authStore: AuthStore;

  constructor() {
    makeAutoObservable(this);

    this.authStore = new AuthStore();
  }
}
