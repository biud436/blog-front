/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export type AuthSwrType = {
  METHODS: 'GET' | 'POST' | 'PATCH' | 'DELETE';
};
export type HttpMethod = AuthSwrType['METHODS'];

export const fetcher = url =>
  axios.get(url).then(res => {
    const result = res.data.result;

    if (result !== 'success') {
      const error = {
        message: res.data.message,
        status: res.status,
      };
      throw error;
    }

    return res.data;
  });