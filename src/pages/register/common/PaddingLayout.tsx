import Box from '@mui/material/Box';
import Container from '@mui/material/Container/Container';
interface PaddingLayoutProps {
  children: [React.ReactElement, React.ReactElement];
}
const PaddingLayout = ({ children }: PaddingLayoutProps) => {
  return (
    <Container component="main" maxWidth="xs" sx={{ padding: '100px 0;' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default PaddingLayout;
