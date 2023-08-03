import useTheme from './useTheme';
import { ThemeProvider } from '@mui/material/styles';

interface CustomThemeProviderProps {
  children: React.ReactNode;
}
const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  const { theme } = useTheme();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default CustomThemeProvider;
