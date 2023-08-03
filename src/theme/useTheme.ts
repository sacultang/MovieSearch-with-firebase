import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { RootState } from '@/store/store';

const useTheme = () => {
  const darkMode = useSelector((state: RootState) => state.themeMode.themeMode);

  const mode = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#161618',
        dark: '#2a2a2e',
        light: '#fff',
      },
    },
  });

  return { theme };
};

export default useTheme;
