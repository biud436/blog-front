import * as React from 'react';
import { useEffect, useCallback, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth } from '@/app/providers/auth/authProvider';
import { DrawerHeader } from '@/app/components/atomic/DrawerHeader';
import { URL_MAP } from '@/common/URL';
import { Button, Container, Grid, Link } from '@mui/material';
import { API_URL } from '../app/api/request';
import axios, { AxiosResponse } from 'axios';
import { CategoryDepthVO } from '@/services/CategoryService';
import { useCategoryService } from '@/hooks/useCategoryService';
import { observer } from 'mobx-react-lite';
import { LoginButton } from '../app/components/category/LoginButton';
import { LogoutButton } from '../app/components/category/LogoutButton';
import { RequestHandler } from '../app/api/axios';
import { useMediaQuery } from 'react-responsive';
import { menuStore } from '@/store/menu';
import { CategoryWrapper } from '../app/components/category/CategoryWrapper';
import { Main } from '../app/components/menu/Main';
import { AppBar, drawerWidth } from '../app/components/menu/AppBar';
import { useRouter } from 'next/router';
import { ManageButton } from '@/app/components/category/ManageButton';
import NextLink from 'next/link';

export const PageWrapper = observer(
    ({ name, children }: { name: string; children: React.ReactNode }) => {
        const router = useRouter();
        const matches = useMediaQuery({
            query: '(max-width: 768px)',
        });
        const theme = useTheme();
        const [categoryList, setCategoryList] = useState<CategoryDepthVO[]>([]);
        const [rootCategory, setRootCategory] = useState<CategoryDepthVO>();
        const categoryService = useCategoryService();

        const handleDrawerOpen = useCallback(
            (e: React.MouseEvent) => {
                menuStore.open();
            },
            [menuStore.isOpen],
        );

        const handleDrawerClose = useCallback(() => {
            menuStore.close();
        }, [menuStore.isOpen]);

        const toggleDrawer = useCallback(
            (open: boolean) =>
                (event: React.KeyboardEvent | React.MouseEvent) => {
                    if (
                        event.type === 'keydown' &&
                        ((event as React.KeyboardEvent).key === 'Tab' ||
                            (event as React.KeyboardEvent).key === 'Shift')
                    ) {
                        event.preventDefault();
                    }

                    menuStore.setOpen(open);
                },
            [menuStore.isOpen],
        );

        /**
         * 카테고리 목록 초기화
         * @returns
         */
        const initCategories = useCallback(async () => {
            const res: AxiosResponse<any> = await axios.get(
                `${API_URL}/admin/category?isBeautify=true`,
                {},
            );

            const categories: CategoryDepthVO[] = res.data.data;

            checkCategoriesOpen(categories);
            setCategoryList(categories);

            // 몹엑스와 연동
            categoryService.setCategories(categories);

            setRootCategory(categories[0]);

            return categories;
        }, [categoryList]);

        /**
         * 카테고리 목록을 재귀적으로 읽고, open을 false로 설정합니다.
         * @param categories
         */
        const checkCategoriesOpen = (categories: CategoryDepthVO[]) => {
            categories.forEach(category => {
                category.open = true;
                if (category.children.length > 0) {
                    checkCategoriesOpen(category.children);
                }
            });
        };

        const initWithSettings = async () => {
            await initCategories();
        };

        const onMenuCloseHandler = (e: MouseEvent) => {
            if (menuStore.isOpen) {
                const target = e.target as HTMLElement;

                if (e.clientX > drawerWidth) {
                    menuStore.close();
                }
            }
        };

        useEffect(() => {
            initWithSettings();
        }, [matches]);

        useEffect(() => {
            if (typeof window !== 'undefined') {
                window.addEventListener(
                    'mousedown',
                    onMenuCloseHandler.bind(this),
                    false,
                );
            }

            return () => {
                if (typeof window !== 'undefined') {
                    window.removeEventListener(
                        'mousedown',
                        onMenuCloseHandler.bind(this),
                        false,
                    );
                }
            };
        }, []);

        return (
            <Container>
                <CssBaseline />
                <AppBar position="fixed" open={menuStore.isOpen}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                mr: 2,
                                ...(menuStore.isOpen && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, cursor: 'pointer' }}
                            onClick={() => {
                                router.push(URL_MAP.MAIN);
                            }}
                        >
                            {name}
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={() => router.push(URL_MAP.POST_EDIT)}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}
                            >
                                글쓰기
                            </Typography>
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    anchor="left"
                    open={menuStore.isOpen}
                    id="drawer-menu"
                >
                    <Box
                        onKeyDown={toggleDrawer(false)}
                        onClick={toggleDrawer(false)}
                    >
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? (
                                    <ChevronLeftIcon />
                                ) : (
                                    <ChevronRightIcon />
                                )}
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <List component="nav">
                            <CategoryWrapper
                                {...{
                                    categoryList,
                                    setCategoryList,
                                    toggleDrawer,
                                    router,
                                    rootCategory,
                                }}
                            />
                            <Divider />
                            <LoginWrapper />
                        </List>
                        <Divider />
                    </Box>
                </Drawer>
                <Main open={menuStore.isOpen}>
                    <DrawerHeader />
                    {children}
                </Main>
                <Grid container spacing={2} sx={{}}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '1rem',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                © 2022
                            </Typography>
                            <Button
                                variant="text"
                                color="primary"
                                href={'https://github.com/biud436'}
                                LinkComponent={NextLink}
                                target="_blank"
                            >
                                어진석
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        );
    },
);

export function LoginWrapper() {
    const auth = useAuth();
    const router = useRouter();
    const [, setIsLoggedIn] = React.useState(false);
    const [isAuthorized, setIsAuthorized] = React.useState(false);

    // 토큰 만료 여부를 확인합니다.
    const checkUserProfile = async () => {
        try {
            const accessToken = '';

            const profile = await RequestHandler.get(
                '/auth/profile',
                accessToken,
            );

            if (profile) {
                setIsAuthorized(true);
            }
        } catch (e) {}
    };

    useEffect(() => {
        // 로그인 여부를 확인합니다.
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            setIsLoggedIn(true);
        }
        checkUserProfile();
    }, [isAuthorized]);

    return (
        <>
            {isAuthorized ? (
                <>
                    <ManageButton />
                    <LogoutButton auth={auth} />
                </>
            ) : (
                <>
                    <LoginButton router={router} />
                </>
            )}
        </>
    );
}
