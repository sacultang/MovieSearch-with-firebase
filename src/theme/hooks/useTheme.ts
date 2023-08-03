import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { RootState } from '@/store/store';
import { grey, amber, indigo } from '@mui/material/colors';

const useTheme = () => {
  const darkMode = useSelector((state: RootState) => state.themeMode.themeMode);
  const mode = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: indigo[500],
        light: indigo[50],
        dark: indigo[900],
        ...(mode === 'dark' && {
          main: grey[800],
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
        default: '#fff',
        paper: '#fff',
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
