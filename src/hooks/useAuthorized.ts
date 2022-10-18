import { RequestHandler } from '@/app/api/axios';
import { useAuth } from '@/app/providers/authProvider';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export function useAuthorized() {
    const [, setIsLoggedIn] = useState(false);
    const [cookies] = useCookies(['access_token', 'username']);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        // 로그인 여부를 확인합니다.
        const isLoggedIn = localStorage.getItem('isLoggedIn');
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

    return [isAuthorized, isDone];
}
