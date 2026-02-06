import React from 'react';
import { Grid2 as Grid, Paper, Alert } from '@mui/material';
import { MainLayout } from '@/layouts/BlogMainLayout';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Meta } from '@/components/common/utils/Meta';
import FlexibleLoading from '@/components/common/FlexibleLoading';
import { PostEditorPageHeader } from './PostEditorPageHeader';
import { PostEditorPageDescription } from './PostEditorPageDescription';
import { useAuthorized } from '@/hooks/server/useAuthorized';

export type EditMode = 'create' | 'edit';
export interface EditPageProps {
  mode: EditMode;
  id?: number;
}

const PostEditorPresent = dynamic(
  async () => {
    const [mod] = await Promise.all([
      import('../post/editor/PostEditorPresent'),
    ]);

    return mod.PostEditorPresent;
  },
  {
    ssr: false,
    loading: () => <FlexibleLoading />,
  },
);

export const PostEditor = ({ mode }: EditPageProps) => {
  return <PostEditorPresent mode={mode} />;
};

export const PostEditorContainer = ({ editorMode }: { editorMode: string }) => {
  const { isAuthorized } = useAuthorized();

  // useState로 할 경우, 렌더링이 두 번 일어나면서 버그가 발생합니다.
  const mode = useRef<EditPageProps['mode']>('create');

  const LoginGuard = ({ children }: { children: React.ReactElement }) => {
    return !isAuthorized ? (
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid size={{ xs: 12 }}>
          <Alert variant="filled" severity="error">
            로그인이 필요한 서비스입니다
          </Alert>
        </Grid>
      </Grid>
    ) : (
      children
    );
  };

  useEffect(() => {
    if (editorMode === 'edit') {
      mode.current = 'edit';
    }
  }, []);

  return (
    <MainLayout name="포스트 에디터">
      <Meta
        {...{
          title: '포스트 에디터',
          description: '포스트를 작성하거나 수정합니다',
        }}
      />
      <Paper sx={{ padding: 2 }} key="editor">
        <LoginGuard>
          <Grid container gap={3}>
            <PostEditorPageHeader mode={mode.current} />
            <PostEditorPageDescription mode={mode.current} />
            <PostEditor mode={mode.current} />
          </Grid>
        </LoginGuard>
        <ToastContainer />
      </Paper>
    </MainLayout>
  );
};
