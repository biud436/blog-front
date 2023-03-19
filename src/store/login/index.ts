import { makeAutoObservable } from 'mobx';

export class LoginDataStore {
    username = '';
    passowrd = '';
    showPasssword = false;
    loggedIn = true;

    constructor() {
        makeAutoObservable(this);
    }
}
