import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { DefaultTheme, ThemeProviderProps } from '@mui/system';
import { makeAutoObservable } from 'mobx';

export type ThemeProps = ThemeProviderProps<DefaultTheme>['theme'];

export class ThemeStore {
    loginTheme: ThemeProps = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#3f51b5',
            },
            secondary: {
                main: '#f50057',
            },
        },
    });

    constructor() {
        makeAutoObservable(this);
    }

    get login() {
        return this.loginTheme;
    }
}
