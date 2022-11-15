import { observer } from 'mobx-react-lite';
import axios from 'axios';
import { Button, css, Grid } from '@mui/material';
import { API_URL } from '@/app/api/request';

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
