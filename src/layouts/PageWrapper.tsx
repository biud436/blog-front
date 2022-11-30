import * as React from 'react';
import { useEffect, useCallback, useState, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';

import { ListItemText } from '@mui/material';
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
import { Button, Container, Box, Grid, Link, ListItem } from '@mui/material';
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
import { AppBar, drawerWidth } from '../app/components/menu/AppBar';
import { useRouter } from 'next/router';
import { ManageButton } from '@/app/components/category/ManageButton';
import CreateIcon from '@mui/icons-material/Create';
import GitHubIcon from '@mui/icons-material/GitHub';
import NextLink from 'next/link';
import MetaCommonConfig from '@/app/components/utils/meta-config.json';

const WriteButton = React.memo(() => {
    const router = useRouter();

    return (
        <Button
            color="inherit"
            onClick={() => router.push(URL_MAP.POST_EDIT)}
            startIcon={<CreateIcon />}
        >
            <Typography
                variant="button"
                sx={{
                    color: {
                        xs: 'white',
                        sm: 'white',
                        md: 'white',
                        lg: '#1e1e1e',
                        xl: '#1e1e1e',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
            >
                글쓰기
            </Typography>
        </Button>
    );
});

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

            const { data: postCountData } = await axios.get(
                `${API_URL}/posts/categories`,
            );
            const postCountMap = postCountData.data.reduce(
                (acc: any, cur: any) => {
                    acc[cur.id] = cur.postCount;
                    return acc;
                },
                {},
            );

            const getCategory = (_categoryList: CategoryDepthVO[]) => {
                _categoryList.forEach(category => {
                    if (category.children) {
                        getCategory(category.children);
                    }
                    category.name = `${category.name} (${
                        postCountMap[category.id]
                    })`;
                });
            };

            getCategory(categories);

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
            <Box
                sx={{
                    width: '100%',
                    background: '#f8f8f8',
                }}
            >
                <CssBaseline />
                <AppBar position="fixed" open={menuStore.isOpen}>
                    <Toolbar
                        sx={{
                            display: {
                                xs: 'flex',
                                sm: 'flex',
                                md: 'flex',
                                lg: 'none',
                                xl: 'none',
                            },
                        }}
                    >
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
                        <WriteButton />
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: {
                            xs: drawerWidth,
                            sm: drawerWidth,
                            md: 0,
                            lg: 0,
                            xl: 0,
                        },
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
                <Box
                    sx={{
                        width: {
                            xs: `100%`,
                            sm: `100%`,
                            md: '100%',
                            lg: '100%',
                            xl: '100%',
                        },
                    }}
                >
                    <Grid
                        container
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={() => {
                                router.push(URL_MAP.MAIN);
                            }}
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                transition: 'all .3s ease-in-out',
                                '&:hover': {
                                    color: 'primary.main',
                                    letterSpacing: '.4rem',
                                    transform: 'scale(1.1)',
                                },
                                borderLeft: '3px solid #1976d2',
                                alignItems: 'center',
                                justifyContent: 'center',
                                pl: 1,
                            }}
                        >
                            {MetaCommonConfig.site_name}
                        </Typography>
                        <Box>
                            <Button
                                startIcon={<GitHubIcon />}
                                LinkComponent="a"
                                href="https://github.com/biud436"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: 'text.secondary',
                                }}
                            />
                            <WriteButton />
                        </Box>
                    </Grid>
                    <Grid
                        container
                        spacing={0}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            justifyItems: 'center',
                            alignItems: 'start',
                            flexWrap: 'nowrap',
                            flexDirection: 'row',
                            gap: '1rem',
                            width: '100%',
                            p: 2,
                            m: 0,
                        }}
                    >
                        <DrawerHeader />
                        <Grid
                            item
                            xs={0}
                            sm={0}
                            md={0}
                            lg
                            xl
                            sx={{
                                display: {
                                    xs: 'none',
                                    sm: 'none',
                                    md: 'none',
                                    lg: 'block',
                                    xl: 'block',
                                },
                            }}
                        >
                            <List
                                component="nav"
                                sx={{
                                    boxShadow: '0 0 0.8em 0 rgba(0, 0, 0, 0.1)',
                                    background: 'white',
                                }}
                            >
                                <ListItem
                                    sx={{
                                        borderLeft: '3px solid #1976d2',
                                    }}
                                >
                                    <ListItemText
                                        primary="카테고리"
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'black',
                                            }}
                                        >
                                            카테고리
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                                <CategoryWrapper
                                    {...{
                                        categoryList,
                                        setCategoryList,
                                        toggleDrawer,
                                        router,
                                        rootCategory,
                                    }}
                                />
                                <LoginWrapper />
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                            {children}
                        </Grid>
                    </Grid>
                </Box>
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
            </Box>
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
