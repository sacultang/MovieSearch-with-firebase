import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { RootState } from '@/store/store';
import { grey, amber } from '@mui/material/colors';

const useTheme = () => {
  const darkMode = useSelector((state: RootState) => state.themeMode.themeMode);
  const mode = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: grey[100],
        light: grey[400],
        dark: grey[900],
        ...(mode === 'dark' && {
          main: grey[900],
          light: grey[500],
        }),
      },
      secondary: {
        main: amber[500],
        light: amber[50],
        dark: amber[900],
        ...(mode === 'dark' && {
          main: grey[800],
          light: grey[500],
        }),
      },
      background: {
        default: grey[100],
        paper: grey[200],
        ...(mode === 'dark' && {
          default: grey[900],
          paper: grey[900],
        }),
      },
    },
  });

  return { theme };
};

export default useTheme;
