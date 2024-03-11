import { FC, PropsWithChildren } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#354446',
    },
    text: {
      primary: '#354446',
    },
  },
  typography: {
    fontFamily: 'sans-serif',
    fontSize: 16,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
  },
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
