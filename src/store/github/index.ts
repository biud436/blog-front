import { makeAutoObservable } from 'mobx';

export class GithubUserData {
    constructor() {
        makeAutoObservable(this);
    }
}
