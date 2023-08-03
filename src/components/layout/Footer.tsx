import Box from '@mui/material/Box';
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        height: '100px',
        backgroundColor: 'var(--main-bg-color)',
        color: 'var(--main-text-color)',
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
