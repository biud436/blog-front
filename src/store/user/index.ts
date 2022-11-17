import { atom, selector } from 'recoil';

// 유저 프로필 설정
export const userState = atom({
    key: 'userState',
    default: {
        username: '',
        scope: [] as string[],
    },
});

export const loggedInState = atom({
    key: 'loggedInState',
    default: false,
});

/**
 * 유저 프로필 조회
 */
export const userProfile = selector({
    key: 'userProfile2',
    get: ({ get }) => {
        const profile = get(userState);

        return profile;
    },
});
