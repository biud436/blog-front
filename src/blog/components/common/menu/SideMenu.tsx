/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DrawerHeader } from '@/blog/components/common/atomic/DrawerHeader';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { CategoryWrapper } from '../category/CategoryWrapper';
import { LoginGuard } from './LoginGuard';
import { useAuthorized } from '@/hooks/server/useAuthorized';

interface SideMenuProps {
  handleDrawerClose: () => void;
  theme: any;
  categoryList: CategoryDepthVO[];
  setCategoryList: React.Dispatch<React.SetStateAction<CategoryDepthVO[]>>;
  toggleDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  router: any;
  rootCategory: CategoryDepthVO | undefined;
}

export function SideMenu({
  handleDrawerClose,
  theme,
  categoryList,
  setCategoryList,
  toggleDrawer,
  router,
  rootCategory,
}: SideMenuProps) {
  const { isAuthorized } = useAuthorized();

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
        <LoginGuard isAuthorized={isAuthorized} />
      </List>
      <Divider />
    </>
  );
}
