import * as React from 'react';
import { useEffect } from 'react';
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
import { useAuth } from '@/app/providers/authProvider';
import { DrawerHeader } from '@/app/components/atomic/DrawerHeader';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { URL_MAP } from '@/common/URL';
import { Collapse, Container } from '@mui/material';
import { API_URL } from '../../api/request';
import axios, { AxiosResponse } from 'axios';
import { CategoryDepthVO } from '@/services/CategoryService';
import { useCategoryService } from '@/hooks/useCategoryService';
import { observer } from 'mobx-react-lite';
import { useCookies } from 'react-cookie';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { MenuPostWriteButton } from './MenuPostWriteButton';
import { RequestHandler } from '../../api/axios';
import { useMediaQuery } from 'react-responsive';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
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
        const [open, setOpen] = React.useState(true);
        const [categoryList, setCategoryList] = React.useState<
            CategoryDepthVO[]
        >([]);
        const categoryService = useCategoryService();

        const handleDrawerOpen = () => {
            setOpen(true);
        };

        const handleDrawerClose = () => {
            setOpen(false);
        };

        /**
         * 카테고리 목록 초기화
         * @returns
         */
        const initCategories = async () => {
            const res: AxiosResponse<any> = await axios.get(
                `${API_URL}/admin/category?isBeautify=true`,
                {},
            );

            const categories: CategoryDepthVO[] = res.data.data;

            checkCategoriesOpen(categories);
            setCategoryList(categories);

            // 몹엑스와 연동
            categoryService.setCategories(categories);

            return categories;
        };

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
                return (
                    <React.Fragment key={index}>
                        <ListItemButton
                            onClick={() => {
                                if (category.children.length > 0) {
                                    category.open = !category.open;
                                    setCategoryList([...categoryList]);
                                }

                                categoryService.setCurrentMenuCategoryId(
                                    category.id,
                                );

                                // navigate(URL_MAP.MAIN);
                            }}
                            sx={{
                                pl: category.depth * 2,
                            }}
                        >
                            <ListItemIcon>
                                {category.children.length > 0 ? (
                                    <ExpandMore />
                                ) : (
                                    <ChevronRightIcon />
                                )}
                            </ListItemIcon>
                            <ListItemText primary={category.name} />
                        </ListItemButton>
                        {category.children.length > 0 && (
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

            setOpen(!matches);
        }, [matches]);

        return (
            <>
                <Container maxWidth="xl">
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <AppBar position="fixed" open={open}>
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
                                <Typography variant="h6" noWrap component="div">
                                    {name}
                                </Typography>
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
                            variant="persistent"
                            anchor="left"
                            open={open}
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
                        </Drawer>
                        <Main open={open}>
                            <DrawerHeader />
                            {children}
                        </Main>
                    </Box>
                </Container>
            </>
        );
    },
);

export function LoginWrapper() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [isLoggenIn, setIsLoggedIn] = React.useState(false);
    const [cookies, setCookie, removeCookie] = useCookies([
        'access_token',
        'username',
    ]);
    const [isAuthorized, setIsAuthorized] = React.useState(false);

    // 토큰 만료 여부를 확인합니다.
    const checkUserProfile = async () => {
        try {
            const accessToken = cookies.access_token;

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
    }, [cookies.access_token, isAuthorized]);

    return (
        <>
            <MenuPostWriteButton navigate={navigate} />
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
