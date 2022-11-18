import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

export class MenuStore {
    isOpen = false;

    constructor() {
        makeAutoObservable(this);

        if (typeof window !== 'undefined') {
            makePersistable(this, {
                name: 'MenuStore',
                properties: ['isOpen'],
                storage: window.localStorage,
            });
        }
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
