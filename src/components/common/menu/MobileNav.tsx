import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/material';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { observer } from 'mobx-react-lite';
import { drawerWidth } from './AppBar';
import { SideMenu } from './SideMenu';
import { useMenuStore } from '@/store/menu';

interface MobileNavProps {
  toggleDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  handleDrawerClose: () => void;
  theme;
  categoryList: CategoryDepthVO[];
  setCategoryList: React.Dispatch<React.SetStateAction<CategoryDepthVO[]>>;
  router;
  rootCategory: CategoryDepthVO | undefined;
  anchorEl: HTMLElement | null;
}

export const MobileNav = observer(
  ({
    toggleDrawer,
    handleDrawerClose,
    theme,
    categoryList,
    setCategoryList,
    router,
    rootCategory,
  }: MobileNavProps) => {
    const menuStore = useMenuStore();

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
              background: 'linear-gradient(45deg, #1e1e1e 30%, #2b2b2b 90%)',
              color: theme.palette.primary.contrastText,

              '& .MuiSvgIcon-root': {
                color: theme.palette.primary.contrastText,
              },

              '& .MuiListItem-root': {
                '&:hover': {
                  backgroundColor: '#a2a2a2',
                },
              },

              '& .MuiDivider-root': {
                backgroundColor: '#404040',
              },
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
