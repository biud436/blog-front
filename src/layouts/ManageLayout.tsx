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
            xs: `calc(100%)`,
            sm: `calc(100%)`,
            md: `calc(100% - ${drawerWidth}px)`,
            lg: `calc(100% - ${drawerWidth}px)`,
            xl: `calc(100% - ${drawerWidth}px)`,
        },
        mr: {
            xs: 0,
            sm: 0,
            md: `${drawerWidth}px`,
            lg: `${drawerWidth}px`,
            xl: `${drawerWidth}px`,
        },
        display: {
            xs: 'fixed',
            sm: 'fixed',
            md: 'none',
            lg: 'none',
            xl: 'none',
        },
    },
    main: {
        flexGrow: 1,
        p: 3,
        pt: {
            xs: 10,
            sm: 10,
            md: 2,
            lg: 2,
            xl: 2,
        },
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
