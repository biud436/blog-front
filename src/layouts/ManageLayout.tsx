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
    ThemeProvider,
    useTheme,
    Stack,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import { useAuthorized } from '@/hooks/useAuthorized';
import { RightManageMenu } from '../blog/components/manage/atomic/RightManageMenu';
import 'react-toastify/dist/ReactToastify.css';
import { Meta } from '@/blog/components/utils/Meta';
import { useEffect, useState } from 'react';
import React from 'react';
import { useThemeStore } from '@/hooks/useThemeStore';
import { ManageIntroducePresent } from '@/blog/components/manage/atomic/ManageIntroducePresent';

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
    const [isAuthorized] = useAuthorized();
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const theme = useThemeStore('manage');

    const LoginGuard = React.memo(({ children }: { children: JSX.Element }) => {
        return !isAuthorized ? (
            <Grid
                container
                sx={{
                    display: 'flex',
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Grid item xs={12}>
                    <Alert
                        variant="filled"
                        severity="error"
                        sx={{
                            width: '100%',
                        }}
                    >
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
        <ThemeProvider theme={theme}>
            <LoginGuard>
                <Box>
                    <Meta
                        {...{
                            title: '관리자 페이지',
                            description: '관리자 페이지입니다',
                        }}
                    />
                    <CssBaseline />
                    <Grid container>
                        <Grid item>
                            <RightManageMenu />
                            <AppBar sx={styles.appBar}>
                                <Toolbar>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                    >
                                        관리자 페이지
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                        </Grid>
                        <Grid item sx={styles.main}>
                            {children}
                            <ManageIntroducePresent />
                        </Grid>
                    </Grid>
                    <ToastContainer />
                </Box>
            </LoginGuard>
        </ThemeProvider>
    );
});
