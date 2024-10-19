import { UserPayload } from '@/models/UserPayload';
import { PaletteMode } from '@mui/material';
import { makeAutoObservable } from 'mobx';

export class UserStore {
  user: Partial<UserPayload> = {};

  isAuthorized = false;
  isDone = false;

  loginTheme: PaletteMode = 'light';

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 사용자를 설정합니다.
   */
  setUser(user: Partial<UserPayload>) {
    this.user = user;
  }

  /**
   * 인증된 사용자를 가져옵니다.
   */
  getUser() {
    return this.user;
  }

  /**
   * 인증된 정보를 제거합니다.
   */
  clearUser() {
    this.user = {};
  }

  /**
   * 인증 여부를 설정합니다.
   */
  setIsAuthorized(isAuthorized: boolean) {
    this.isAuthorized = isAuthorized;
  }

  /**
   * 인증 함수 실행 여부를 설정합니다.
   */
  setIsDone(isDone: boolean) {
    this.isDone = isDone;
  }

  /**
   * 인증 여부를 가져옵니다.
   */
  getIsAuthorized() {
    return this.isAuthorized;
  }

  /**
   * 인증 함수 실행 여부를 가져옵니다.
   */
  getIsDone() {
    return this.isDone;
  }

  setLoginTheme(mode: PaletteMode) {
    this.loginTheme = mode;
  }

  getLoginTheme() {
    return this.loginTheme;
  }
}

export const userStore = new UserStore();
