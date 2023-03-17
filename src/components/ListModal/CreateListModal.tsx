import React, { useState, useCallback, ChangeEvent, lazy } from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';

import { setListModalAction } from '../../store/toastSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { doc, collection, setDoc } from 'firebase/firestore';
import '../../firebase';
import { db } from '../../firebase';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CreateListInput from './CreateListInput';
const ListSelectBox = lazy(() => import('./ListSelectBox'));

const CreateListModal = () => {
  const modalOpen = useSelector((state: RootState) => state.toast.listModal);
  const user = useSelector((state: RootState) => state.user.user);
  const listMovie = useSelector((state: RootState) => state.listMovie.movie);

  const dispatch = useDispatch();
  const [selectList, setSelectList] = useState('');
  const [openAddList, setOpenAddList] = useState(false);
  const [listName, setListName] = useState('');

  const handleClose = useCallback(() => {
    dispatch(setListModalAction(false));
    setOpenAddList(false);
  }, [dispatch]);
  const handleListNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setListName(e.target.value);
    },
    []
  );

  const handleAddList = async () => {
    if (user?.uid) {
      if (!listName && openAddList) {
        alert('목록 이름을 써주세요');
        return;
      }
      const docRef = doc(db, 'users', user.email!);
      const favoriteRef = collection(docRef, 'list');
      try {
        openAddList
          ? await setDoc(doc(favoriteRef, encodeURIComponent(listName)), {
              list: listMovie, //필드
            })
          : await setDoc(doc(favoriteRef, selectList), {
              list: listMovie, //필드
            });
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setListModalAction(false));
        setOpenAddList(false);
      }
    }
  };

  return (
    <Dialog open={modalOpen} onClose={handleClose}>
      <DialogTitle>목록에 추가</DialogTitle>

      {openAddList ? (
        <CreateListInput handleListNameChange={handleListNameChange} />
      ) : (
        <ListSelectBox
          setSelectList={setSelectList}
          selectList={selectList}
          setOpenAddList={setOpenAddList}
        />
      )}
      <DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            취소
          </Button>
          <Button onClick={handleAddList} variant="contained">
            추가
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateListModal;
