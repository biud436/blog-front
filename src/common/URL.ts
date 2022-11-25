export const URL_MAP = {
    MAIN: '/',
    LOGIN: '/login',
    POST_EDIT: '/edit',
    POSTS: '/post',
    MANAGE: '/manage',
    ADMIN_CATEGORY: '/manage/category',
    ADMIN_BLOG_INFO: '/manage/info',
};

export type TURL = {
    // 인덱서
    [key in keyof typeof URL_MAP]: string;
};

export const BAD_REQUEST_EXCEPTION = '서버와의 연결이 원활하지 않습니다.';
