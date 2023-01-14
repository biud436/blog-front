import { makeAutoObservable } from 'mobx';
import { GithubUserData } from './github';
import { LoginDataStore } from './login';
import { MenuStore } from './menu';
import { PostsStore } from './posts';
import { ThemeStore } from './theme';

export class RootStore {
    postsStore: PostsStore = new PostsStore();
    menuStore: MenuStore = new MenuStore();
    readonly themeStore: ThemeStore = new ThemeStore();
    readonly loginStore: LoginDataStore = new LoginDataStore();
    readonly githubUserData: GithubUserData = new GithubUserData();

    constructor() {
        makeAutoObservable(this);
    }
}

export const rootStore = new RootStore();
export const menuStore = rootStore.menuStore;
export const postsStore = rootStore.postsStore;
