import { API_URL } from '@/app/api/request';
import { PageWrapper } from '@/layouts/PageWrapper';
import { Avatar, ImageList, Typography } from '@mui/material';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useCookie } from 'react-use';

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
        <PageWrapper name="깃허브 로그인 콜백 페이지">
            <Avatar alt={githubData?.login} src={githubData?.avatar_url} />
            <Typography variant="h6">{githubData?.email}</Typography>
        </PageWrapper>
    );
});
