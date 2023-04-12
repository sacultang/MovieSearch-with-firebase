import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styled from '@emotion/styled';
import MovieIcon from '@mui/icons-material/Movie';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined';

import MenuListItem from './MenuListItem';
import { moviePath, tvPath, myFavoritePage } from './DrawerMenuList';
import { FIREBASE_REF } from '../../constants/firebaseRef';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import SearchInput from '../../pages/home/SearchInput';

interface DrawerMenuProp {
  barOpen: boolean;
  handleDrawerClose: () => void;
}

const DrawerMenu = ({ barOpen, handleDrawerClose }: DrawerMenuProp) => {
  const user = useSelector((state: RootState) => state.user.user);
  const myListPage = useSelector((state: RootState) => state.listMovie.list);
  const navigate = useNavigate();

  const handleDeleteMyList = async (
    e: React.MouseEvent<HTMLDivElement>,
    listId: string
  ) => {
    e.preventDefault();
    const confirmResult = window.confirm('삭제 하시겠습니까?');
    if (confirmResult) {
      const docRef = doc(db, FIREBASE_REF.USERS, user.email as string);
      const myListRef = collection(docRef, FIREBASE_REF.LIST);
      const listDocRef = doc(myListRef, listId);
      await deleteDoc(listDocRef);
      navigate('/');
    }
  };

  return (
    <Drawer anchor="left" open={barOpen} onClose={handleDrawerClose}>
      <Toolbar sx={{ backgroundColor: 'primary.main' }}>
        <Link to="/" aria-label="go to main-page">
          <LogoDiv aria-hidden={true}>
            <div>메인</div>
          </LogoDiv>
        </Link>
        <Link to="/">
          <Typography
            variant="h6"
            fontWeight={600}
            fontSize={'1.2rem'}
            color="#fff"
          >
            O-Movie
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
          <MenuListItem
            list={list}
            key={list.text}
            buttonHandler={buttonHandler}
          />
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
          <MenuListItem
            list={list}
            key={list.text}
            buttonHandler={buttonHandler}
          />
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
            <MenuListItem
              list={list}
              key={list.text}
              buttonHandler={buttonHandler}
            />
          ))}
          {myListPage &&
            myListPage.map((list) => (
              <ListItem key={list.id} disablePadding>
                <NavLink
                  to={`/list/${list.id}`}
                  style={buttonHandler}
                  onClick={handleDrawerClose}
                >
                  <ListItemButton sx={{ flex: 3 }} aria-label="목록 이름">
                    <ListItemText primary={decodeURIComponent(list.id)} />
                  </ListItemButton>
                  <ListItemButton
                    aria-label="delete-button"
                    sx={{ flex: 1 }}
                    onClick={(e) => handleDeleteMyList(e, list.id)}
                  >
                    <DeleteForeverOutlined color="info" />
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

export const LogoDiv = styled.div`
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #8360c3;
  background: -webkit-linear-gradient(to right, #2ebf91, #8360c3);
  background: linear-gradient(to right, #2ebf91, #8360c3);
  margin-right: 20px;
  div {
    visibility: hidden;
  }
`;
type NavStyleType = {
  isActive: boolean;
};
const buttonHandler = ({ isActive }: NavStyleType) => {
  return {
    width: '100%',
    backgroundColor: isActive ? '#f3f3f3' : '',
    borderLeft: isActive ? '5px solid var(--yellow-text-color)' : '',
    color: '#000 ',
    display: 'flex',
  };
};
