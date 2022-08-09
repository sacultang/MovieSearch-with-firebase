import React from 'react';

import Box from '@mui/material/Box';
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        height: '150px',
        backgroundColor: 'var(--main-bg-color)',
        color: ' var(--main-text-color)',
        position: ' relative',
        width: { xs: '100%', lg: 'calc(100% - 200px)' },
        marginLeft: 'auto',
      }}
    >
      Footer
    </Box>
  );
};

export default Footer;
