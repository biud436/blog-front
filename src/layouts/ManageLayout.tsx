import {
    AppBar,
    Box,
    CssBaseline,
    SxProps,
    Theme,
    Toolbar,
    Typography,
    Alert,
    ThemeProvider,
    useTheme,
    Stack,
    Button,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { toast, ToastContainer } from 'react-toastify';
import { useAuthorized } from '@/hooks/useAuthorized';
import { ManageMenu } from '../blog/components/manage/ManageMenu';
import 'react-toastify/dist/ReactToastify.css';
import { Meta } from '@/blog/components/utils/Meta';
import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';
import { useThemeStore } from '@/hooks/useThemeStore';
import { ManageIntroducePresent } from '@/blog/components/manage/ManageIntroducePresent';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useMounted } from '@/hooks/useMounted';
import { LoginGuard } from '../blog/components/manage/LoginGuard';

export interface ManageLayoutProps {
    children: React.ReactNode;
}

export const drawerWidth = 280;

export function useManageMenuProps(drawerWidth: number) {
    const [theme] = useState<SxProps>(() => {
        return {
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
        };
    });

    return theme;
}

export function useAppBarProps(drawerWidth: number) {
    const [theme] = useState<SxProps>(() => {
        return {
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
        };
    });

    return theme;
}

export const ManageLayout = observer(({ children }: ManageLayoutProps) => {
    const isMounted = useMounted();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const theme = useThemeStore('manage');
    const manageMenuProps = useManageMenuProps(drawerWidth);
    const appBarProps = useAppBarProps(drawerWidth);

    const handleDrawerOpen = useCallback((e: React.MouseEvent) => {
        setIsOpen(true);
    }, []);

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
                        sx={manageMenuProps}
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
                        <AppBar sx={appBarProps}>
                            <Toolbar
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={0}
                                    alignItems="center"
                                >
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleDrawerOpen}
                                        edge="start"
                                        sx={{
                                            mr: 2,
                                            display: {
                                                xs: 'flex',
                                                sm: 'flex',
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
