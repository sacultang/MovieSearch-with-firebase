import React, { useState, useCallback, ChangeEvent, lazy } from 'react';
import { setListModalAction } from '../../store/toastSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { checkListMovieId } from '../../utils/checkFavoriteMovieId';
import { db } from '../../firebase';
import { doc, collection, setDoc, getDoc } from 'firebase/firestore';
import '../../firebase';
import { Dialog, DialogActions, Button } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CreateListInput from './CreateListInput';
import { IMovieResult } from '../../types/movieType';
import { SimilarType } from '../../types/similarType';
const ListSelectBox = lazy(() => import('./ListSelectBox'));

const CreateListModal = () => {
  const modalOpen = useSelector((state: RootState) => state.toast.listModal);
  const user = useSelector((state: RootState) => state.user.user);
  const selectMovie = useSelector((state: RootState) => state.listMovie.movie);
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
      const docRef = doc(db, 'users', user.email as string);
      const myListRef = collection(docRef, 'list');
      if (openAddList) {
        try {
          await setDoc(doc(myListRef, encodeURIComponent(listName)), {
            list: [selectMovie],
          });
        } catch (e) {
          throw new Error(`error ${e}`);
        } finally {
          dispatch(setListModalAction(false));
          setOpenAddList(false);
        }
      } else {
        const listDocRef = doc(myListRef, encodeURIComponent(selectList));
        const listDoc = await getDoc(listDocRef);
        const existingList: IMovieResult[] | SimilarType = listDoc.data()?.list;
        if (checkListMovieId(selectMovie.id, existingList)) {
          alert('이미 해당 영화/TV가 리스트에 있습니다.');
          return;
        }
        try {
          await setDoc(listDocRef, {
            list: [selectMovie, ...existingList],
          });
        } catch (e) {
          throw new Error(`error ${e}`);
        } finally {
          dispatch(setListModalAction(false));
          setOpenAddList(false);
        }
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
