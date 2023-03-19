import React from 'react';
import { Grid, Paper, Typography, Divider, Alert } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { MainLayout } from '@/layouts/BlogMainLayout';
import { useEffect, useRef } from 'react';
import { useAuthorized } from '@/hooks/useAuthorized';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Meta } from '@/blog/components/utils/Meta';
import FlexibleLoading from '@/blog/components/common/FlexibleLoading';

export type EditMode = 'create' | 'edit';
export interface EditPageProps {
    mode: EditMode;
    id?: number;
}

function PageHeader({ mode }: EditPageProps) {
    return (
        <Grid item xs={12}>
            <Typography variant="h5">
                <ChevronRight />
                블로그 포스트 {mode === 'edit' ? '수정' : '작성'}
            </Typography>
            <Divider />
        </Grid>
    );
}

function PageDescription({ mode }: EditPageProps) {
    return (
        <Grid item xs={12}>
            <Grid container gap={4}>
                <Grid item xs={12}>
                    <Alert severity="info">
                        포스트를 {mode === 'edit' ? '수정' : '작성'}합니다.
                    </Alert>
                </Grid>
            </Grid>
        </Grid>
    );
}

const PostEditorPresent = dynamic(
    async () => {
        const [mod] = await Promise.all([
            import('../../components/editor/PostEditorPresent'),
        ]);

        return mod.PostEditorPresent;
    },
    {
        ssr: false,
        loading: () => <FlexibleLoading />,
    },
);

export const PostEditor = observer(({ mode }: EditPageProps) => {
    return <PostEditorPresent mode={mode} />;
});

export const PostEditorContainer = observer(
    ({ editorMode }: { editorMode: string }) => {
        const [isAuthorized] = useAuthorized();

        // useState로 할 경우, 렌더링이 두 번 일어나면서 버그가 발생합니다.
        const mode = useRef<EditPageProps['mode']>('create');

        const LoginGuard = ({ children }: { children: JSX.Element }) => {
            return !isAuthorized ? (
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Grid item xs={12}>
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
                            <PageHeader mode={mode.current} />
                            <PageDescription mode={mode.current} />
                            <PostEditor mode={mode.current} />
                        </Grid>
                    </LoginGuard>
                    <ToastContainer />
                </Paper>
            </MainLayout>
        );
    },
);
