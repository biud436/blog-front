import { RequestHandler } from '@/app/api/axios';
import { useAuth } from '@/app/providers/auth/authProvider';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';

export function useAuthorized() {
    const [, setIsLoggedIn] = useState(false);
    const [cookies] = useCookies(['access_token', 'username']);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isDone, setIsDone] = useState(false);

    // 로그인 여부 확인
    const { data: isLoggedIn, mutate } = useSWR('isLoggedIn', () => {
        return localStorage.getItem('isLoggedIn');
    });

    // 로그인 여부 변경
    const changeIsLoggedIn = (_isLoggedIn: boolean) => {
        localStorage.setItem('isLoggedIn', _isLoggedIn + '');
        mutate(isLoggedIn);
    };

    useEffect(() => {
        // 로그인 여부를 확인합니다.
        if (isLoggedIn) {
            setIsLoggedIn(true);
        }

        // 프로필 체크합니다.
        checkUserProfile();
    }, [cookies.access_token, isAuthorized]);

    // 토큰 만료 여부를 확인합니다.
    const checkUserProfile = async () => {
        try {
            const accessToken = cookies.access_token;

            const profile = await RequestHandler.get(
                '/auth/profile',
                accessToken,
            );

            if (profile) {
                setIsAuthorized(true);
            }
        } catch (e) {
            setIsAuthorized(false);
        } finally {
            setIsDone(true);
        }
    };

    return [isAuthorized, isDone, changeIsLoggedIn];
}
