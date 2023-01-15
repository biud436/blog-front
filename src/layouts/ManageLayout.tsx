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
    Button,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { toast, ToastContainer } from 'react-toastify';
import { useAuthorized } from '@/hooks/useAuthorized';
import { ManageMenu } from '../blog/components/manage/atomic/ManageMenu';
import 'react-toastify/dist/ReactToastify.css';
import { Meta } from '@/blog/components/utils/Meta';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { useThemeStore } from '@/hooks/useThemeStore';
import { ManageIntroducePresent } from '@/blog/components/manage/atomic/ManageIntroducePresent';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

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
    const [isOpen, setIsOpen] = useState<boolean>(false);
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

    const handleDrawerOpen = (e: React.MouseEvent) => {
        setIsOpen(true);
    };

    const toggleDrawer = useCallback(
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                event.preventDefault();
            }

            setIsOpen(open);
        },
        [],
    );

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <></>;
    }

    return (
        <ThemeProvider theme={theme}>
            <LoginGuard>
                <Box sx={{ display: 'flex' }}>
                    <Meta
                        {...{
                            title: '관리자 페이지',
                            description: '관리자 페이지입니다',
                        }}
                    />
                    <CssBaseline />
                    <ManageMenu
                        variant="permanent"
                        isOpen={true}
                        sx={{
                            display: {
                                xs: 'none',
                                sm: 'none',
                                md: 'block',
                                lg: 'block',
                                xl: 'block',
                            },
                            flexShrink: 0,
                            width: {
                                xs: 0,
                                sm: 0,
                                md: drawerWidth,
                            },
                            '& .MuiDrawer-paper': {
                                display: 'block',
                                width: {
                                    xs: 0,
                                    sm: 0,
                                    md: drawerWidth,
                                },
                                boxSizing: 'border-box',
                                boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    />
                    <Box
                        onKeyDown={toggleDrawer(false)}
                        onClick={toggleDrawer(false)}
                    >
                        <ManageMenu
                            variant="temporary"
                            isOpen={isOpen}
                            sx={{
                                width: drawerWidth,
                                flexShrink: 0,
                            }}
                        />
                    </Box>
                    <Box>
                        <AppBar
                            sx={{
                                display: {
                                    xs: 'block',
                                },
                                width: {
                                    xs: '100%',
                                    sm: '100%',
                                    md: `calc(100% - ${drawerWidth}px)`,
                                },
                                marginLeft: {
                                    xs: 0,
                                    sm: 0,
                                    md: `${drawerWidth}px`,
                                },
                            }}
                        >
                            <Toolbar
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Stack direction="row" spacing={2}>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleDrawerOpen}
                                        edge="start"
                                        sx={{
                                            mr: 2,
                                            display: {
                                                xs: 'block',
                                                sm: 'block',
                                                md: 'none',
                                            },
                                        }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{ flexGrow: 1 }}
                                    >
                                        관리자 페이지
                                    </Typography>
                                </Stack>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            mt: 10,
                            width: {
                                xs: '100%',
                                sm: '100%',
                                md: `calc(98vw - ${drawerWidth}px)`,
                            },
                        }}
                    >
                        {children}
                    </Box>
                    <ToastContainer />
                </Box>
            </LoginGuard>
        </ThemeProvider>
    );
});
