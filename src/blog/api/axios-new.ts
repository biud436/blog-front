import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    timeout: 20000, // 20초
    withCredentials: true,
});

instance.defaults.headers.common['x-timezone-offset'] =
    -new Date().getTimezoneOffset() / 60;
instance.defaults.headers.common['x-timezone-name'] =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

export default instance;
