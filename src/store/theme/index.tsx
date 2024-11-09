import { createTheme, Theme } from '@mui/material';
import { create } from 'zustand';

// Theme store의 상태 타입 정의
interface ThemeState {
  mainTheme: Theme;
  loginTheme: Theme;
  manageTheme: Theme;
  getLogin: () => Theme;
  getManage: () => Theme;
  getMain: () => Theme;
}

// Theme store 생성
const useThemeStore = create<ThemeState>((set, get) => ({
  // Main Theme
  mainTheme: createTheme({
    typography: {
      fontFamily: 'Noto Sans KR, sans-serif',
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderLeft: '4px solid #18599b',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          '*::-webkit-scrollbar': {
            width: '0.3em',
            backgroundColor: '#fff',
          },
          '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0)',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#0A68B4',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            border: '1px solid #D3D3D3',
            boxShadow: 'none',
            backgroundColor: '#fff',
            color: '#000',

            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#fff',
              textDecoration: 'underline',
            },
          },
        },
      },
    },
  }),

  // Login Theme
  loginTheme: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#9163F4',
      },
      secondary: {
        main: '#7046ca',
      },
      info: {
        main: '#4e4957',
      },
    },
  }),

  // Manage Theme
  manageTheme: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#9163F4',
      },
      secondary: {
        main: '#9f63f4',
      },
    },
    typography: {
      fontFamily: 'Noto Sans KR',
      fontSize: 16,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            background: `linear-gradient(45deg, #9163F4 30%, #A580F5 90%)`,
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          title: {
            color: '#e7e4e4',
            fontWeight: 'bold',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            background: '#583b97',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          root: {
            '& .MuiDrawer-paper': {
              color: '#c1c1c1',
              '& .MuiListItem-root': {
                '&:hover': {
                  background: '#5f5f5f',
                },
              },
            },
            '& .MuiSvgIcon-root': {
              color: '#d0d0d0',
            },
            '& .MuiDivider-root': {
              background: '#363636',
            },
          },
        },
      },
    },
  }),

  // Getter methods
  getLogin: () => get().loginTheme,
  getManage: () => get().manageTheme,
  getMain: () => get().mainTheme,
}));

export default useThemeStore;
