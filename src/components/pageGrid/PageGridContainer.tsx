import React from 'react';
import Grid from '@mui/material/Grid';
interface PageGridContainerProp {
  children: React.ReactNode;
}
const PageGridContainer = ({ children }: PageGridContainerProp) => {
  return <Grid container>{children}</Grid>;
};

export default PageGridContainer;
