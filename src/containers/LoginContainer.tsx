'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Box, Button, Stack, ThemeProvider, Typography } from '@mui/material';
import { URL_MAP } from '@/common/URL';
import { Meta } from '@/blog/components/common/utils/Meta';
import 'react-toastify/dist/ReactToastify.css';

import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';

import { observer } from 'mobx-react-lite';
import GitHubIcon from '@mui/icons-material/GitHub';
import styled from 'styled-components';
import { UserPayload } from '@/models/UserPayload';
import { useRouter } from 'next/navigation';
import z from 'zod';
import { useLogin } from '@/hooks/server/useLogin';
import { userStore } from '@/store/user/UserStore';
import useThemeStore from '@/store/theme';

export interface LoginFormProps {
  username: string;
  password: string;
}

const RedText = styled.span`
  color: #9e1111;
  text-decoration: underline;
`;

/**
 * 로그인 페이지 메인
 */
export const LoginContainer = observer(() => {
  const theme = useThemeStore(state => state.getLogin());
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

  const { login } = useLogin();

  /**
   * 로그인 처리
   *
   * @param username
   * @param password
   * @returns
   */
  const handleLogin = async (username: string, password: string) => {
    try {
      // 로그인 요청 중...
      toast.info('로그인 요청 중...', {
        position: 'top-center',
      });

      const data = { username, password };
      const result = z
        .object({
          username: z.string(),
          password: z.string(),
        })
        .safeParse(data);

      return await login.mutate(data, {
        onSuccess: () => {
          toast.dismiss();
          router.push(URL_MAP.MAIN);
        },
      });
    } finally {
      // empty
    }
  };

  const loginByGithubId = async () => {
    router.push('/api/github/login');
  };

  const onSubmit = async (data: LoginFormProps) => {
    const { username, password } = data;

    return await handleLogin(username, password);
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

  return (
    <ThemeProvider theme={theme}>
      <FormContainer formContext={formContext}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            background: '#a0a0a0',
            flexDirection: 'column',
          }}
        >
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
            flexDirection="column"
          >
            <Stack
              direction={'column'}
              gap={2}
              sx={{
                borderRadius: 4,
                width: {
                  xs: '300px',
                  sm: '400px',
                  md: '500px',
                },
                background: 'white',
                boxShadow: 1,
                border: '1px solid #e0e0e0',
                p: 3,
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                textAlign={'center'}
                pb={1}
                fontFamily={"Noto Sans KR', sans-serif"}
              >
                로그인
              </Typography>
              <TextFieldElement name="username" label="아이디" required />
              <PasswordElement name="password" label="비밀번호" required />
              <Button
                variant="contained"
                onClick={() => {
                  formContext?.handleSubmit(onSubmit)();
                }}
              >
                로그인
              </Button>
              <Button
                startIcon={<GitHubIcon />}
                variant="contained"
                color="info"
                onClick={() => {
                  loginByGithubId();
                }}
              >
                Github 계정으로 로그인
              </Button>
            </Stack>
            <Stack mt={1}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                }}
              >
                <RedText>관리자 계정</RedText>으로만 로그인이 가능합니다.
              </Typography>
            </Stack>
          </Box>
          <ToastContainer />
        </Box>
      </FormContainer>
    </ThemeProvider>
  );
});
