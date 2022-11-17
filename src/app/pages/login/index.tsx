import * as React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../../store/user';
import { useAuth } from '@/app/providers/auth/authProvider';
import { LoginResponse } from 'app/providers/auth/LoginResponse';
import { toast } from 'react-toastify';
import { State } from './common';
import { useMethods, useRendersCount } from 'react-use';
import { User } from 'store/types';
import { LoginTab } from './components/LoginTab';
import { Container, Grid, Stack } from '@mui/material';
import { URL_MAP } from '@/common/URL';
import { useRouter } from 'next/router';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

/**
 * 로그인 페이지 메인
 */
export function LoginPage() {
    const [values, setValues] = React.useState<State>({
        username: '',
        password: '',
        showPassword: false,
    });
    const [user] = useRecoilState(userState);
    const [, setValue] = React.useState(1);

    /**
     * USE CONTEXTS
     */
    const router = useRouter();
    const auth = useAuth();
    const rendersCount = useRendersCount();

    /**
     * 유저 데이터 변경 처리
     *
     * @param prop
     * @returns
     */
    const handleChange = (prop: keyof State) => (event: InputChangeEvent) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const toggleShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    /**
     * 로그인 처리
     *
     * @param username
     * @param password
     * @returns
     */
    const login = async (username: string, password: string) => {
        // 로그인 요청 중...
        toast.info('로그인 요청 중...', {
            position: 'top-center',
            isLoading: true,
        });

        try {
            return await auth.login(username, password, () => {
                toast.dismiss();
                router.push(URL_MAP.MAIN);
            });
        } catch (e: any) {
            toast.dismiss();
            toast.error(e.message, {
                position: 'top-center',
            });
        }
    };

    /**
     * 비밀번호 표시/감추기 제어
     */
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    /**
     * 알림창 표시
     */
    const toastWrapper = (
        message: '아이디를 입력해주세요' | '비밀번호를 입력해주세요' | string,
    ) => {
        toast(message, {
            position: 'top-right',
            containerId: '#login-page',
        });
    };

    /**
     * 로그인
     */
    const handleLogin = async (event: any) => {
        event.preventDefault();

        const idValue = values.username;
        const pwValue = values.password;

        if (idValue === '') {
            toastWrapper('아이디를 입력해주세요');
            return;
        }

        if (pwValue === '') {
            toastWrapper('비밀번호를 입력해주세요');
            return;
        }

        return login(idValue, pwValue);
    };

    /**
     * 훅 마운트 처리
     */
    useEffect(() => {
        const currentUser = user as User;
        if (currentUser && currentUser.username !== '') {
            toastWrapper('이미 로그인되어있습니다');
        }
    }, []);

    return (
        <Container maxWidth="sm">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <LoginTab
                        handleChange={handleChange}
                        handleLogin={handleLogin}
                        handleMouseDownPassword={handleMouseDownPassword}
                        setValue={setValue}
                        values={values}
                        handleClickShowPassword={toggleShowPassword}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
