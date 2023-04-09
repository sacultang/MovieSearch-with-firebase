import { ReactNode } from 'react';
import Box from '@mui/material/Box';
interface TabLayoutProps {
  children?: ReactNode;
}
const TabLayout = ({ children }: TabLayoutProps) => {
  return <Box mt={5}>{children}</Box>;
};

export default TabLayout;
