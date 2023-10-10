import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import MovieIcon from '@mui/icons-material/Movie';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MainLogo from '../common/MainLogo';
import MenuListItem from './MenuListItem';
import { moviePath, tvPath, myFavoritePage } from './DrawerMenuList';

import useUser from '@/pages/hooks/useUser';

interface DrawerMenuProp {
  barOpen: boolean;
  handleDrawerClose: () => void;
}

const DrawerMenu = ({ barOpen, handleDrawerClose }: DrawerMenuProp) => {
  const { user } = useUser();
  const myListPage = useSelector((state: RootState) => state.listMovie.list);

  return (
    <Drawer anchor="left" open={barOpen} onClose={handleDrawerClose}>
      <Box sx={{ width: '200px', pl: 1, pr: 1 }}>
        <MainLogo drawer={true} />
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
            <MenuListItem listPath={list} key={list.text} />
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
            <MenuListItem listPath={list} key={list.text} />
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
              <MenuListItem listPath={list} key={list.text} />
            ))}
            {myListPage &&
              myListPage.map((list) => {
                const listItem = {
                  text: decodeURIComponent(list.id),
                  path: `/list/${list.id}`,
                };
                return (
                  <MenuListItem
                    listPath={listItem}
                    key={list.id}
                    isMyList={true}
                  />
                );
              })}
          </List>
        )}
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
