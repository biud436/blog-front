import * as React from 'react';
import { useEffect, useCallback, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router';
import { useAuth } from '@/app/providers/auth/authProvider';
import { DrawerHeader } from '@/app/components/atomic/DrawerHeader';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { URL_MAP } from '@/common/URL';
import { Button, Collapse, Container } from '@mui/material';
import { API_URL } from '../app/api/request';
import axios, { AxiosResponse } from 'axios';
import { CategoryDepthVO } from '@/services/CategoryService';
import { useCategoryService } from '@/hooks/useCategoryService';
import { observer } from 'mobx-react-lite';
import { useCookies } from 'react-cookie';
import { LoginButton } from '../app/components/category/LoginButton';
import { LogoutButton } from '../app/components/category/LogoutButton';
import { MenuPostWriteButton } from '../app/components/category/MenuPostWriteButton';
import { RequestHandler } from '../app/api/axios';
import { useMediaQuery } from 'react-responsive';
import { GrAddCircle } from 'react-icons/gr';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const PageWrapper = observer(
    ({ name, children }: { name: string; children: React.ReactNode }) => {
        const navigate = useNavigate();
        const matches = useMediaQuery({
            query: '(max-width: 768px)',
        });
        const theme = useTheme();
        const [open, setOpen] = useState(false);
        const [categoryList, setCategoryList] = useState<CategoryDepthVO[]>([]);
        const [rootCategory, setRootCategory] = useState<CategoryDepthVO>();
        const categoryService = useCategoryService();

        const handleDrawerOpen = useCallback(
            (e: React.MouseEvent) => {
                setOpen(true);
            },
            [open],
        );

        const handleDrawerClose = useCallback(() => {
            setOpen(false);
        }, [open]);

        const toggleDrawer = useCallback(
            (open: boolean) =>
                (event: React.KeyboardEvent | React.MouseEvent) => {
                    if (
                        event.type === 'keydown' &&
                        ((event as React.KeyboardEvent).key === 'Tab' ||
                            (event as React.KeyboardEvent).key === 'Shift')
                    ) {
                        console.log('tab');
                        event.preventDefault();
                    }

                    setOpen(open);
                },
            [open],
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

        /**
         * 카테고리 리스트를 동적으로 생성합니다.
         *
         * @param categories
         * @returns {JSX.Element} JSX.Element
         */
        const makeCategoryList = (categories: CategoryDepthVO[]) => {
            return categories.map((category, index) => {
                const isNotEmpty = category.children.length > 0;
                const key = `category-${index}`;

                return (
                    <React.Fragment key={key}>
                        <ListItemButton
                            onClick={(e: React.MouseEvent) => {
                                if (isNotEmpty) {
                                    category.open = !category.open;
                                    setCategoryList([...categoryList]);
                                }

                                categoryService.setCurrentMenuCategoryId(
                                    rootCategory === category
                                        ? null
                                        : category.id,
                                );
                                toggleDrawer(false);
                                navigate(URL_MAP.MAIN);
                            }}
                            onKeyDown={toggleDrawer(false)}
                            sx={{
                                pl: category.depth * 2,
                            }}
                        >
                            <ListItemIcon>
                                {isNotEmpty ? (
                                    <ExpandMore />
                                ) : (
                                    <ChevronRightIcon />
                                )}
                            </ListItemIcon>
                            <ListItemText primary={category.name} />
                        </ListItemButton>
                        {isNotEmpty && (
                            <Collapse
                                in={category.open}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div" disablePadding>
                                    {makeCategoryList(category.children)}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                );
            });
        };

        const initWithSettings = async () => {
            await initCategories();
        };

        useEffect(() => {
            initWithSettings();
        }, [matches]);

        return (
            <Container
            // onClick={(e: React.MouseEvent) => {
            //     toggleDrawer(false);

            //     e.preventDefault();
            // }}
            >
                <CssBaseline />
                <AppBar
                    position="fixed"
                    open={open}
                    sx={
                        {
                            // display: {
                            //     xs: 'none',
                            //     sm: 'block',
                            //     md: 'none',
                            //     lg: 'none',
                            // },
                        }
                    }
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                mr: 2,
                                ...(open && { display: 'none' }),
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
                                navigate(URL_MAP.MAIN);
                            }}
                        >
                            {name}
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={() => navigate(URL_MAP.POST_EDIT)}
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
                    open={open}
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
                            {makeCategoryList(categoryList)}
                            <Divider />
                            <LoginWrapper />
                        </List>
                        <Divider />
                    </Box>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    {children}
                </Main>
            </Container>
        );
    },
);

export function LoginWrapper() {
    const auth = useAuth();
    const navigate = useNavigate();
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
                <LogoutButton auth={auth} />
            ) : (
                <>
                    <LoginButton navigate={navigate} />
                </>
            )}
        </>
    );
}
