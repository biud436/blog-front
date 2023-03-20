import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/material';
import { CategoryDepthVO } from '@/services/CategoryService';
import { observer } from 'mobx-react-lite';
import { menuStore } from '@/store/';
import { drawerWidth } from '../menu/AppBar';
import { SideMenu } from './SideMenu';

export const MobileNav = observer(
    ({
        toggleDrawer,
        handleDrawerClose,
        theme,
        categoryList,
        setCategoryList,
        router,
        rootCategory,
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
            <Box onKeyDown={toggleDrawer(false)} onClick={toggleDrawer(false)}>
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
                    <SideMenu
                        {...{
                            handleDrawerClose,
                            theme,
                            categoryList,
                            setCategoryList,
                            toggleDrawer,
                            router,
                            rootCategory,
                        }}
                    />
                </Drawer>
            </Box>
        );
    },
);