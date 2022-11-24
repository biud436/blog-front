import { useAuthorized } from '@/hooks/useAuthorized';
import { PageWrapper } from '@/layouts/PageWrapper';
import { Alert, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Meta } from '../utils/Meta';
import { ManagePresent } from './ManagePresent';

export interface ManagerProps {}

export const ManageContainer = observer(({}: ManagerProps) => {
    const [isAuthorized, isDone] = useAuthorized();

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

    return (
        <PageWrapper name="관리자 페이지">
            <Meta
                {...{
                    title: '관리자 페이지',
                    description: '관리자 페이지입니다',
                }}
            />
            <LoginGuard>
                <ManagePresent />
            </LoginGuard>
        </PageWrapper>
    );
});
