import { makeAutoObservable } from 'mobx';

export class MenuStore {
    isOpen = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }

    close() {
        this.isOpen = false;
    }

    open() {
        this.isOpen = true;
    }

    setOpen(isOpen: boolean) {
        this.isOpen = isOpen;
    }
}

export const menuStore = new MenuStore();
