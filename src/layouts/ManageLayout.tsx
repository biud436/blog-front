import React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  SxProps,
  Toolbar,
  Typography,
  ThemeProvider,
  Stack,
  Container,
  Button,
} from '@mui/material';
import { ToastContainer } from 'react-toastify';

import { ManageMenu } from '../components/manage/ManageMenu';
import 'react-toastify/dist/ReactToastify.css';
import { Meta } from '@/components/common/utils/Meta';
import { useCallback, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useMounted } from '@/hooks/useMounted';
import { LoginGuard } from '../components/manage/LoginGuard';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useRouter } from 'next/navigation';
import useThemeStore from '@/store/theme';

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
      },
      background: 'linear-gradient(to top, #ece9e6, #ffffff)',
      marginLeft: {
        xs: 0,
        sm: 0,
        md: `${drawerWidth}px`,
      },
    };
  });

  return theme;
}

export const ManageLayout = ({ children }: ManageLayoutProps) => {
  const isMounted = useMounted();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useThemeStore(state => state.getManage());
  const appBarProps = useAppBarProps(drawerWidth);
  const router = useRouter();

  const handleDrawerOpen = useCallback(() => {
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
        <Box
          sx={{
            display: 'flex',
            /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            background: 'linear-gradient(to top, #FFFFFF, #ECE9E6)',
          }}
        >
          <Meta
            {...{
              title: '관리자 모드',
              description: '관리자 모드',
            }}
          />
          <CssBaseline />
          <Box onKeyDown={toggleDrawer(false)} onClick={toggleDrawer(false)}>
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
            <AppBar sx={appBarProps} color="transparent" variant="outlined">
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Stack direction="row" spacing={0} alignItems="center">
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
                  <Typography variant="h6" noWrap component="div">
                    관리자 페이지
                  </Typography>
                </Stack>
                <Stack>
                  <Button
                    variant="text"
                    startIcon={<KeyboardReturnIcon />}
                    onClick={() => {
                      router.back();
                    }}
                  >
                    돌아가기
                  </Button>
                </Stack>
              </Toolbar>
            </AppBar>
          </Box>
          <Container>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                mt: 10,
              }}
            >
              {children}
            </Box>
          </Container>
          <ToastContainer />
        </Box>
      </LoginGuard>
    </ThemeProvider>
  );
};
