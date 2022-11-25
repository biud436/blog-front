import {
    AppBar,
    Box,
    CssBaseline,
    SxProps,
    Theme,
    Toolbar,
    Typography,
    Grid,
    Alert,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import { useAuthorized } from '@/hooks/useAuthorized';
import { RightManageMenu } from '../app/components/manage/atomic/RightManageMenu';
import 'react-toastify/dist/ReactToastify.css';
import { Meta } from '@/app/components/utils/Meta';
import { useEffect, useState } from 'react';
import React from 'react';

export interface ManageLayoutProps {
    children: React.ReactNode;
}

export const drawerWidth = 240;
export const styles: Record<string, SxProps<Theme>> = {
    appBar: {
        width: {
            xs: `calc(100% - ${drawerWidth}px)`,
            sm: `calc(100% - ${drawerWidth}px)`,
        },
        mr: `${drawerWidth}px`,
    },
    main: {
        flexGrow: 1,
        p: 3,
        pt: 10,
        bgcolor: 'background.default',
    },
};

export const ManageLayout = observer(({ children }: ManageLayoutProps) => {
    const [isAuthorized, isDone] = useAuthorized();
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const LoginGuard = React.memo(({ children }: { children: JSX.Element }) => {
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
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <></>;
    }

    return (
        <LoginGuard>
            <Box sx={{ display: 'flex' }}>
                <Meta
                    {...{
                        title: '관리자 페이지',
                        description: '관리자 페이지입니다',
                    }}
                />
                <CssBaseline />
                <AppBar position="fixed" sx={styles.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            관리자 페이지
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box component="main" sx={styles.main}>
                    {children}
                </Box>
                <RightManageMenu />
                <ToastContainer />
            </Box>
        </LoginGuard>
    );
});
