import { createTheme } from '@mui/material';
import { DefaultTheme, ThemeProviderProps } from '@mui/system';
import { makeAutoObservable } from 'mobx';

export type ThemeProps = ThemeProviderProps<DefaultTheme>['theme'];

export class ThemeStore {
    loginTheme: ThemeProps = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#9163F4',
            },
            secondary: {
                main: '#7046ca',
            },
        },
    });

    manageTheme: ThemeProps = createTheme({
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
                            background: '#27243B',
                            color: '#c1c1c1',

                            '& .MuiListItem-root': {
                                '&:hover': {
                                    background: '#583b97',
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
    });

    constructor() {
        makeAutoObservable(this);
    }

    get login() {
        return this.loginTheme;
    }

    get manage() {
        return this.manageTheme;
    }
}
