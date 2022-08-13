import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Typography from '@mui/material/Typography';

interface IProps {
  subOpen: boolean;
  subAnchorEl: null;
  handleSubClose:
    | ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
}

const SubMenuList = ({ subOpen, subAnchorEl, handleSubClose }: IProps) => {
  const openListModalFunc = () => {};

  return (
    <Menu
      open={subOpen}
      anchorEl={subAnchorEl}
      id="sub-positioned-menu"
      aria-labelledby="sub-positioned-button"
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      onClose={handleSubClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 0,
          ml: 10,

          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 15,
            left: -4,

            width: 12,
            height: 12,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem onClick={openListModalFunc}>
        <ControlPointIcon sx={{ width: '1rem' }} />
        <Typography
          gutterBottom
          variant="body1"
          sx={{ fontSize: '0.8rem', mb: 0 }}
        >
          &nbsp;목록생성
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default SubMenuList;
