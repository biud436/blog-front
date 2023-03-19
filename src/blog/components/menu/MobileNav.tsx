import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DrawerHeader } from '@/blog/components/atomic/DrawerHeader';
import { Box } from '@mui/material';
import { CategoryDepthVO } from '@/services/CategoryService';
import { observer } from 'mobx-react-lite';
import { menuStore } from '@/store/';
import { CategoryWrapper } from '../category/CategoryWrapper';
import { drawerWidth } from '../menu/AppBar';
import { LoginGuard } from './LoginGuard';

export const MobileNav = observer(
    ({
        toggleDrawer,
        handleDrawerClose,
        theme,
        categoryList,
        setCategoryList,
        router,
        rootCategory,
        anchorEl,
    }: {
        toggleDrawer: (
            open: boolean,
        ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
        handleDrawerClose: () => void;
        theme;
        categoryList: CategoryDepthVO[];
        setCategoryList: React.Dispatch<
            React.SetStateAction<CategoryDepthVO[]>
        >;
        router;
        rootCategory: CategoryDepthVO | undefined;
        anchorEl: HTMLElement | null;
    }) => {
        return (
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
                transitionDuration={400}
                SlideProps={{
                    translate: 'yes',
                    appear: true,
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
                        <LoginGuard />
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        );
    },
);
