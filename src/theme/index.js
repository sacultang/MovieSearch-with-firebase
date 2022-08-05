import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#161618',
      darker: '#2a2a2e',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});
