import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { LogoDiv } from './DrawerCSS';
import MovieIcon from '@mui/icons-material/Movie';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Link, NavLink, useLocation } from 'react-router-dom';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchInput from '../../pages/home/SearchInput';
import {
  drawerWidth,
  moviePath,
  tvPath,
  myFavoritePage,
} from './DrawerMenuList';
import { theme } from '../../theme';

type NavStyleType = {
  isActive: boolean;
};
const buttonHandler = ({ isActive }: NavStyleType) => {
  return {
    width: '100%',
    backgroundColor: isActive ? '#f3f3f3' : '',
    borderLeft: isActive ? '5px solid var(--yellow-text-color)' : '',
    color: '#000 ',
  };
};

interface DrawerMenuProp {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerMenu = ({ open, setOpen }: DrawerMenuProp) => {
  const { pathname } = useLocation();
  const user = useSelector((state: RootState) => state.user.user);
  const myListPage = useSelector((state: RootState) => state.listMovie.list);

  const handlMenuOpenClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        display: {
          xs: open ? 'block' : 'none',
          sm: open ? 'block' : 'none',
          md: 'block',
        },
        zIndex: 1252,
      }}
      variant="permanent"
      anchor="left"
      open={open}
    >
      <Toolbar
        sx={{
          backgroundColor: 'primary.main',
        }}
      >
        <Link to="/">
          <LogoDiv>
            <div aria-hidden={true}>메인</div>
          </LogoDiv>
        </Link>
        <Link to="/">
          <Typography
            variant="h6"
            fontWeight={600}
            fontSize={'1.2rem'}
            color="#fff"
          >
            MOVIE
          </Typography>
        </Link>
      </Toolbar>
      <Divider />
      <List>
        <ListItem>
          <SearchInput border="drawer" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Typography
            variant="h6"
            fontWeight={600}
            fontSize={'1.2rem'}
            p={1}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <MovieIcon sx={{ mr: 1 }} /> Movie
          </Typography>
        </ListItem>
        {moviePath.map((list) => (
          <ListItem key={list.text} disablePadding onClick={handlMenuOpenClose}>
            <NavLink to={`${list.path}`} style={buttonHandler}>
              <ListItemButton>
                <ListItemText
                  primary={list.text}
                  sx={{
                    color:
                      `${theme.palette.mode}` === 'dark'
                        ? `${pathname}` === `${list.path}`
                          ? 'primary.main'
                          : 'primary.light'
                        : 'primary.main',
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Typography
            variant="h6"
            fontWeight={600}
            fontSize={'1.2rem'}
            p={1}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <LiveTvIcon sx={{ mr: 1 }} /> TV
          </Typography>
        </ListItem>
        {tvPath.map((list) => (
          <ListItem key={list.text} disablePadding onClick={handlMenuOpenClose}>
            <NavLink to={`${list.path}`} style={buttonHandler}>
              <ListItemButton>
                <ListItemText
                  primary={list.text}
                  sx={{
                    color:
                      `${theme.palette.mode}` === 'dark'
                        ? `${pathname}` === `${list.path}`
                          ? 'primary.main'
                          : 'primary.light'
                        : 'primary.main',
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      {user.uid && (
        <List>
          <ListItem disablePadding>
            <Typography
              variant="h6"
              fontWeight={600}
              fontSize={'1.2rem'}
              p={1}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <AccountCircleIcon sx={{ mr: 1 }} /> My Page
            </Typography>
          </ListItem>
          {myFavoritePage.map((list) => (
            <ListItem
              key={list.text}
              disablePadding
              onClick={handlMenuOpenClose}
            >
              <NavLink to={`${list.path}`} style={buttonHandler}>
                <ListItemButton>
                  <ListItemText
                    primary={list.text}
                    sx={{
                      color:
                        `${theme.palette.mode}` === 'dark'
                          ? `${pathname}` === `${list.path}`
                            ? 'primary.main'
                            : 'primary.light'
                          : 'primary.main',
                    }}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
          {myListPage.length &&
            myListPage.map((list) => (
              <ListItem
                key={list.id}
                disablePadding
                onClick={handlMenuOpenClose}
              >
                <NavLink to={`/list/${list.id}`} style={buttonHandler}>
                  <ListItemButton>
                    <ListItemText
                      primary={decodeURIComponent(list.id)}
                      sx={{
                        color:
                          `${theme.palette.mode}` === 'dark'
                            ? `${pathname}` === `/list/${list.id}`
                              ? 'primary.main'
                              : 'primary.light'
                            : 'primary.main',
                      }}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ))}
        </List>
      )}
    </Drawer>
  );
};

export default DrawerMenu;
