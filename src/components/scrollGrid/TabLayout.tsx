import { ReactNode } from 'react';
import Box from '@mui/material/Box';
interface TabLayoutProps {
  children?: ReactNode;
  mainPage?: boolean;
}
const TabLayout = ({ children, mainPage }: TabLayoutProps) => {
  return (
    <Box
      sx={{
        width: 'auto',
        height: 'auto',
        minHeight: mainPage ? 510 : 430,
        marginBottom: 4,
      }}
    >
      {children}
    </Box>
  );
};

export default TabLayout;
