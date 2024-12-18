import instance from '@/lib/axios-new';
import { LoginDto } from '@/models/LoginDto';
import { LoginResponse } from '@/models/LoginResponse';
import { ServerResponse } from '@/types/ServerResponse';
import axios, { AxiosResponse } from 'axios';

/**
 * 모든 요청에 대한 기본 설정을 지정합니다.
 */
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

// x-timezone-offset
axios.defaults.headers.common['x-timezone-offset'] =
  -new Date().getTimezoneOffset() / 60;
axios.defaults.headers.common['x-timezone-name'] =
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const authService = {
  /**
   * 로그인 요청을 합니다.
   *
   * @param loginDto
   * @returns
   */
  async login(
    loginDto: LoginDto,
  ): Promise<AxiosResponse<ServerResponse<LoginResponse>>> {
    return await axios.post('/auth/login', loginDto);
  },
  /**
   * 프로필을 가져옵니다.
   */
  async getProfile() {
    const res = await instance.get('/auth/profile');

    return res.data;
  },
  /**
   * 프로필을 가져옵니다 (캐시 없음)
   */
  async getProfileNoCache() {
    const res = await instance.get('/auth/profile', {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    });

    return res.data;
  },
  /**
   * 로그아웃
   */
  async logout() {
    return await instance.post('/auth/logout');
  },
};
