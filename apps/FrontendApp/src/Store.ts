import { makeAutoObservable } from 'mobx';
import { AuthStore } from './stores/AuthStore';

export class Store {
  authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore();
    makeAutoObservable(this);
  }
}
