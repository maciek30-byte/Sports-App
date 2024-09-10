import { makeAutoObservable } from 'mobx';
import { AuthService } from '../../AuthService/AuthService';

export class AuthStore {
  private _isUserLoggedIn = false;
  userName: string = '';

  constructor() {
    makeAutoObservable(this);
    this.checkInitialAuthState();
  }

  private checkInitialAuthState() {
    const token = localStorage.getItem('token');
    if (token) {
      this._isUserLoggedIn = true;
    }
  }

  get isUserLoggedIn(): boolean {
    return this._isUserLoggedIn;
  }

  set isUserLoggedIn(value: boolean) {
    this._isUserLoggedIn = value;
  }

  async login(email: string, password: string) {
    try {
      const result = await AuthService.login(email, password);
      localStorage.setItem('token', result.token);
      this.isUserLoggedIn = true;
      this.userName = email;
      return result;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async register(name: string, email: string, password: string, age: number, gender: string) {
    try {
      const result = await AuthService.register(name, email, password, age, gender);
      return result;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.isUserLoggedIn = false;
      this.userName = '';
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }
}
