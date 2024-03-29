'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import { Button } from '@mui/material';
import { API_URL } from '@/blog/api/request';

/**
 * @deprecated
 */
export const GithubOAuthButton = observer(() => {
    const requestGithubOAUth = async () => {
        const res = await axios.get(API_URL + '/auth/github/identity');
        const requestUrl = res.data;

        window.location.href = requestUrl;
    };

    return (
        <Button
            onClick={() => requestGithubOAUth()}
            variant="contained"
            sx={{
                color: 'white',
            }}
        >
            깃허브 계정으로 로그인
        </Button>
    );
});
