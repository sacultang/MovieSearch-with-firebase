import Grid from '@mui/material/Grid';
interface ScrollGridContainerProps {
  children: React.ReactNode;
}
const ScrollGridContainer = ({ children }: ScrollGridContainerProps) => {
  return (
    <Grid container direction="row" flexWrap="nowrap" mb={3} mt={3}>
      {children}
    </Grid>
  );
};

export default ScrollGridContainer;
