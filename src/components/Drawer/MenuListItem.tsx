import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';

interface MenuList {
  list: {
    text: string;
    path: string;
  };

  buttonHandler: ({ isActive }: { isActive: boolean }) => CSSProperties;
}
const MenuListItem = ({ list, buttonHandler }: MenuList) => {
  return (
    <ListItem key={list.text} disablePadding>
      <NavLink to={`${list.path}`} style={buttonHandler}>
        <ListItemButton aria-label={list.text}>
          <ListItemText primary={list.text} />
        </ListItemButton>
      </NavLink>
    </ListItem>
  );
};

export default MenuListItem;
