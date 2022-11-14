import { PostEditorPresent } from '@/app/components/editor/PostEditorPresent';
import { Grid, Paper, Typography, Divider, Alert } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { PageWrapper } from '@/layouts/PageWrapper';
import { RequireAuth } from '@/app/providers/auth/authProvider';
import { useEffect, useState } from 'react';
import { useAuthorized } from '@/hooks/useAuthorized';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

export interface EditPageProps {
    mode: string;
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

export const PostEditor = observer(({ mode }: EditPageProps) => {
    return <PostEditorPresent mode={mode} />;
});

export const PostEditorContainer = observer(() => {
    const [search, setSearch] = useSearchParams();
    const [isAuthorized, isDone] = useAuthorized();
    const [mode, setMode] = useState('create');

    const LoginGuard = ({ children }: { children: JSX.Element }) => {
        return !isAuthorized ? (
            <Grid container>
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
        if (search.get('mode') === 'edit') {
            setMode('edit');
        }
    }, [isDone]);

    return (
        <PageWrapper name="포스트 에디터">
            <Paper sx={{ padding: 2 }} key="editor">
                <LoginGuard>
                    <Grid container gap={3}>
                        <PageHeader mode={mode} />
                        <PageDescription mode={mode} />
                        <PostEditor mode={mode} />
                    </Grid>
                </LoginGuard>
            </Paper>
        </PageWrapper>
    );
});
