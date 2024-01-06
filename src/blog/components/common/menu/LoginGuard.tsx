'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/blog/providers/auth/authProvider';
import { LoginButton } from '../category/LoginButton';
import { LogoutButton } from '../category/LogoutButton';
import { RequestHandler } from '../../../api/axios';
import { ManageButton } from '@/blog/components/common/category/ManageButton';

export function LoginGuard() {
    const auth = useAuth();

    const [, setIsLoggedIn] = React.useState(false);
    const [isAuthorized, setIsAuthorized] = React.useState(false);

    // 토큰 만료 여부를 확인합니다.
    const checkUserProfile = async () => {
        try {
            const accessToken = '';

            const profile = await RequestHandler.get(
                '/auth/profile',
                accessToken,
            );

            if (profile) {
                setIsAuthorized(true);
            }
        } catch (e) {
            /** empty */
        }
    };

    useEffect(() => {
        // 로그인 여부를 확인합니다.
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            setIsLoggedIn(true);
        }
        checkUserProfile();
    }, [isAuthorized]);

    return (
        <>
            {isAuthorized ? (
                <>
                    <ManageButton />
                    <LogoutButton auth={auth} />
                </>
            ) : (
                <>
                    <LoginButton />
                </>
            )}
        </>
    );
}
