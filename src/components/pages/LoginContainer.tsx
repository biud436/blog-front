'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { toast } from 'react-toastify';
import { CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { URL_MAP } from '@/common/URL';
import { Meta } from '@/components/common/utils/Meta';
import 'react-toastify/dist/ReactToastify.css';

import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';

import GitHubIcon from '@mui/icons-material/GitHub';
import { useRouter } from 'next/navigation';
import z from 'zod';
import { useLogin } from '@/hooks/server/useLogin';
import useThemeStore from '@/store/theme';
import { SiteLogo } from '@/components/blog/BlogHeader';

export interface LoginFormProps {
  username: string;
  password: string;
}

/** 라이트/다크 테마 변수(--b-*)를 따르는 입력창 스타일 */
const fieldSx = {
  '& .MuiInputLabel-root': { color: 'var(--b-text-3)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--b-text)' },
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'var(--b-surface)',
    color: 'var(--b-text)',
    '& fieldset': { borderColor: 'var(--b-border-strong)' },
    '&:hover fieldset': { borderColor: 'var(--b-text-3)' },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--b-text)',
      borderWidth: '1px',
    },
  },
  '& .MuiIconButton-root': { color: 'var(--b-text-3)' },
  '& .MuiFormHelperText-root': { marginLeft: 0 },
};

/**
 * 로그인 페이지 메인
 */
export const LoginContainer = () => {
  const theme = useThemeStore(state => state.getBlog());
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormContainer formContext={formContext}>
        <Meta
          {...{
            title: '로그인',
            description: '관리자 로그인',
          }}
        />
        <div className="b-root b-login">
          <div className="b-login__card">
            <SiteLogo />
            <h1 className="b-login__title">관리자 로그인</h1>
            <p className="b-login__desc">
              글을 쓰고 블로그를 관리하려면 로그인하세요.
            </p>
            <Stack direction="column" gap={2} sx={fieldSx}>
              <TextFieldElement name="username" label="아이디" required />
              <PasswordElement name="password" label="비밀번호" required />
              <button
                type="button"
                className="b-btn b-btn--primary"
                style={{ width: '100%' }}
                onClick={() => {
                  formContext?.handleSubmit(onSubmit)();
                }}
              >
                로그인
              </button>
              <div className="b-login__divider">또는</div>
              <button
                type="button"
                className="b-btn"
                style={{ width: '100%' }}
                onClick={() => {
                  loginByGithubId();
                }}
              >
                <GitHubIcon /> GitHub 계정으로 로그인
              </button>
            </Stack>
            <p className="b-login__note">
              <b>관리자 계정</b>으로만 로그인할 수 있습니다.
            </p>
          </div>
        </div>
      </FormContainer>
    </ThemeProvider>
  );
};
