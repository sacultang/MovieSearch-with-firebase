import Box from '@mui/material/Box';
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        height: '100px',
        width: '100%',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      &#169;{new Date().getFullYear()} OJ
    </Box>
  );
};

export default Footer;
