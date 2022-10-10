import { makeAutoObservable } from 'mobx';

export class LoginDataStore {
  username: string = '';
  passowrd: string = '';
  showPasssword: boolean = false;
  loggedIn: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }
}
