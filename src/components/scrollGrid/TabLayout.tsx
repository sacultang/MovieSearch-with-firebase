import { ReactNode } from 'react';
import Box from '@mui/material/Box';
interface TabLayoutProps {
  children?: ReactNode;
}
const TabLayout = ({ children }: TabLayoutProps) => {
  return (
    <Box
      sx={{
        width: 'auto',
        height: 'auto',
        minHeight: 400,
        marginBottom: 4,
      }}
    >
      {children}
    </Box>
  );
};

export default TabLayout;
