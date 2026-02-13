import React from 'react';
import { Box, Alert } from '@mui/material';
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

/* ── Design Tokens (shared with PostContainer) ────────── */
export const editorTokens = {
  ink: '#1c1917',
  inkSecondary: '#57534e',
  inkTertiary: '#a8a29e',
  inkMuted: '#d6d3d1',
  parchment: '#fafaf9',
  surface: '#ffffff',
  accent: '#c2410c',
  accentSoft: '#fff7ed',
  accentHover: '#9a3412',
  border: 'rgba(28, 25, 23, 0.06)',
  borderHover: 'rgba(28, 25, 23, 0.12)',
  borderStrong: 'rgba(28, 25, 23, 0.18)',
  destructive: '#dc2626',
  destructiveSoft: '#fef2f2',
};

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
      <Box
        sx={{
          backgroundColor: editorTokens.parchment,
          minHeight: '100vh',
          py: { xs: 0, md: 4 },
          px: { xs: 0, md: 2 },
        }}
      >
        {/* Editor surface card */}
        <Box
          sx={{
            maxWidth: '960px',
            margin: '0 auto',
            width: '100%',
            backgroundColor: editorTokens.surface,
            borderRadius: { xs: 0, md: '16px' },
            boxShadow: {
              xs: 'none',
              md: '0 1px 3px rgba(28,25,23,0.04), 0 4px 16px rgba(28,25,23,0.06)',
            },
            overflow: 'hidden',
          }}
          key="editor"
        >
          {!isAuthorized ? (
            <Box sx={{ p: { xs: '20px', md: '48px' } }}>
              <Alert
                severity="error"
                sx={{
                  borderRadius: '8px',
                  border: '1px solid rgba(220, 38, 38, 0.12)',
                  backgroundColor: editorTokens.destructiveSoft,
                  color: editorTokens.ink,
                  '& .MuiAlert-icon': { color: editorTokens.destructive },
                }}
              >
                로그인이 필요한 서비스입니다
              </Alert>
            </Box>
          ) : (
            <Box>
              <PostEditorPageHeader mode={mode.current} />
              <PostEditorPageDescription mode={mode.current} />
              <PostEditor mode={mode.current} />
            </Box>
          )}
        </Box>
        <ToastContainer />
      </Box>
    </MainLayout>
  );
};
