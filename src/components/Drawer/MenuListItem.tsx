import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';

interface MenuList {
  list: {
    text: string;
    path: string;
  };
}
const MenuListItem = ({ list }: MenuList) => {
  return (
    <ListItem disablePadding>
      <Link
        component={NavLink}
        to={list.path}
        sx={{
          width: '100%',
          '&.active': {
            bgcolor: 'primary.light',
            color: 'text.primary',
          },
          color: 'text.primary',
        }}
        underline="none"
      >
        <ListItemButton aria-label={list.text}>
          <ListItemText>{list.text}</ListItemText>
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default MenuListItem;
