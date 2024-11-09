import { makeAutoObservable } from 'mobx';

export class RootStore {
  isPrivate = false;

  constructor() {
    makeAutoObservable(this);
  }
}

export const rootStore = new RootStore();
