import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined';
import { FIREBASE_REF } from '../../constants/firebaseRef';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import useUser from '@/pages/hooks/useUser';

interface MenuList {
  listPath: {
    text: string;
    path: string;
  };
  isMyList?: boolean;
}
const MenuListItem = ({ listPath, isMyList }: MenuList) => {
  const navigate = useNavigate();
  const { user } = useUser();

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
    <ListItem>
      <Link
        component={NavLink}
        to={listPath.path}
        sx={{
          width: '100%',
          '&.active': {
            bgcolor: 'primary.light',
          },
          color: 'text.primary',
          borderRadius: 2,
        }}
        underline="none"
        display="flex"
      >
        <ListItemButton aria-label={listPath.text} sx={{ flex: 2 }}>
          <ListItemText>{listPath.text}</ListItemText>
        </ListItemButton>
        {isMyList && (
          <ListItemButton
            aria-label="delete-button"
            onClick={(e) => handleDeleteMyList(e, listPath.text)}
            sx={{
              justifyContent: 'center',
              width: '100%',
              padding: 0,
              flex: 1,
            }}
          >
            <DeleteForeverOutlined color="info" />
          </ListItemButton>
        )}
      </Link>
    </ListItem>
  );
};

export default MenuListItem;
