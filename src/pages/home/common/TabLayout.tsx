import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
interface IProps {
  children?: ReactNode;
}
const TabLayout = ({ children }: IProps) => {
  return <Box mt={5}>{children}</Box>;
};

export default TabLayout;
