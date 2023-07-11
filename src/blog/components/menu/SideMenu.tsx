/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DrawerHeader } from '@/blog/components/atomic/DrawerHeader';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { CategoryWrapper } from '../category/CategoryWrapper';
import { LoginGuard } from './LoginGuard';
import { Box } from '@mui/material';

export function SideMenu({
    handleDrawerClose,
    theme,
    categoryList,
    setCategoryList,
    toggleDrawer,
    router,
    rootCategory,
}: {
    handleDrawerClose: () => void;
    theme: any;
    categoryList: CategoryDepthVO[];
    setCategoryList: React.Dispatch<React.SetStateAction<CategoryDepthVO[]>>;
    toggleDrawer: (
        open: boolean,
    ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
    router: any;
    rootCategory: CategoryDepthVO | undefined;
}) {
    return (
        <>
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
        </>
    );
}
