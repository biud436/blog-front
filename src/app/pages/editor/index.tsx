import { PostEditorPresent } from '@/app/components/editor/PostEditorPresent';
import { Grid, Paper, Typography, Divider, Alert } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { PageWrapper } from '@/app/components/category/PageWrapper';
import { RequireAuth } from '@/app/providers/authProvider';
import { useEffect } from 'react';
import { useAuthorized } from '@/hooks/useAuthorized';

function PageHeader() {
    return (
        <Grid item xs={12}>
            <Typography variant="h5">
                <ChevronRight />
                블로그 포스트 작성
            </Typography>
            <Divider />
        </Grid>
    );
}

function PageDescription() {
    return (
        <Grid item xs={12}>
            <Grid container gap={4}>
                <Grid item xs={12}>
                    <Alert severity="info">
                        포스트를 작성하거나 수정합니다.
                    </Alert>
                </Grid>
            </Grid>
        </Grid>
    );
}

export const PostEditor = observer(() => {
    return <PostEditorPresent />;
});

export const PostEditorContainer = observer(() => {
    const [isAuthorized, isDone] = useAuthorized();

    const LoginGuard = ({ children }: { children: JSX.Element }) => {
        return !isAuthorized ? (
            <Grid container>
                <Grid item xs={12}>
                    <Alert variant="filled" severity="error">
                        로그인이 필요한 서비스입니다.
                    </Alert>
                </Grid>
            </Grid>
        ) : (
            children
        );
    };

    useEffect(() => {}, [isDone]);

    return (
        <PageWrapper name="포스트 에디터">
            <Paper sx={{ padding: 2 }} key="editor">
                <LoginGuard>
                    <RequireAuth>
                        <Grid container gap={3}>
                            <PageHeader />
                            <PageDescription />
                            <PostEditor />
                        </Grid>
                    </RequireAuth>
                </LoginGuard>
            </Paper>
        </PageWrapper>
    );
});
