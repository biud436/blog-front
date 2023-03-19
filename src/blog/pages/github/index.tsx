/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from '@/blog/api/request';
import { MainLayout } from '@/layouts/BlogMainLayout';
import { Avatar, Typography } from '@mui/material';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

export const GithubCallbackPage = observer(() => {
    const [githubData, setGithubData] = useState<any>();

    const query = new URLSearchParams(window.location.search);

    const requestAccessToken = async () => {
        const res = await axios.get(API_URL + '/auth/github/callback', {
            params: {
                code: query.get('code'),
                state: query.get('state'),
            },
        });

        const data = res.data;

        if (!data) {
            return;
        }

        setGithubData(data);

        localStorage.setItem('avatar', githubData.avatar_url);
    };

    useEffect(() => {
        requestAccessToken();
    }, [githubData]);

    return (
        <MainLayout name="깃허브 로그인 콜백 페이지">
            <Avatar alt={githubData?.login} src={githubData?.avatar_url} />
            <Typography variant="h6">{githubData?.email}</Typography>
        </MainLayout>
    );
});
