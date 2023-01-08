import * as React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../../store/user';
import { useAuth } from '@/app/providers/auth/authProvider';
import { toast, ToastContainer } from 'react-toastify';
import { State } from '../../components/common/login/common';
import { useRendersCount } from 'react-use';
import { User } from 'store/types';

import { Box, Button, Container, Stack } from '@mui/material';
import { URL_MAP } from '@/common/URL';
import { useRouter } from 'next/router';
import { Meta } from '@/app/components/utils/Meta';
import 'react-toastify/dist/ReactToastify.css';
import { LoginTab } from '@/app/components/common/login/components/LoginTab';
import {
    FormContainer,
    PasswordElement,
    TextFieldElement,
    useForm,
    useFormContext,
} from 'react-hook-form-mui';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface LoginFormProps {
    username: string;
    password: string;
}

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
    const formContext = useForm<LoginFormProps>({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    /**
     * USE CONTEXTS
     */
    const router = useRouter();
    const auth = useAuth();

    /**
     * 로그인 처리
     *
     * @param username
     * @param password
     * @returns
     */
    const login = async (username: string, password: string) => {
        try {
            // 로그인 요청 중...
            toast.info('로그인 요청 중...', {
                position: 'top-center',
            });

            return await auth.login(username, password, () => {
                toast.dismiss();
                router.push(URL_MAP.MAIN);
            });
        } finally {
        }
    };

    const onSubmit = async (data: LoginFormProps) => {
        const { username, password } = data;
        return await login(username, password);
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
     * 훅 마운트 처리
     */
    useEffect(() => {
        const currentUser = user as User;
        if (currentUser && currentUser.username !== '') {
            toastWrapper('이미 로그인되어있습니다');
        }
    }, []);

    return (
        <Container>
            <Meta
                {...{
                    title: '로그인',
                    description: '관리자 로그인',
                }}
            />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <FormContainer formContext={formContext} onSuccess={() => {}}>
                    <Stack direction={'column'} gap={2}>
                        <TextFieldElement
                            name="username"
                            label="아이디"
                            required
                        />
                        <PasswordElement
                            name="password"
                            label="비밀번호"
                            required
                        />
                        <Button
                            variant="contained"
                            onClick={() => {
                                formContext?.handleSubmit(onSubmit)();
                            }}
                        >
                            로그인
                        </Button>
                    </Stack>
                </FormContainer>
            </Box>
            <ToastContainer />
        </Container>
    );
}
