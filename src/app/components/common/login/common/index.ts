import { createTheme } from '@mui/material';
import styled from 'styled-components/macro';

export interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

export const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
        },
        root: {
          '& .MuiTab-root.Mui-selected': {
            color: '#333333',
          },
        },
      },
    },
  },
});

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
`;

export const RelativeDiv = styled.div`
  position: relative;
`;
