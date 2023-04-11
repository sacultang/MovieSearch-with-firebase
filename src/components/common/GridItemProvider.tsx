import Grid from '@mui/material/Grid';
interface GridItemProps {
  children: React.ReactNode;
}
const GridItemProvider = ({ children }: GridItemProps) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={6}
      lg={4}
      xl={3}
      position="relative"
      height="auto"
    >
      {children}
    </Grid>
  );
};

export default GridItemProvider;
