import { collection, setDoc, getDoc, doc } from 'firebase/firestore';

import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../firebase';
import { RootState } from '../../../store/store';
import { setListModalAction } from '../../../store/toastSlice';
import { IMovieResult } from '../../../types/movieType';
import { SimilarType } from '../../../types/similarType';
import { checkListMovieId } from '../../../utils/checkFavoriteMovieId';

const useAddList = (
  openAddList: boolean,
  setOpenAddList: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [listName, setListName] = useState('');
  const [selectList, setSelectList] = useState('');
  const user = useSelector((state: RootState) => state.user.user);
  const selectMovie = useSelector((state: RootState) => state.listMovie.movie);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(setListModalAction(false));
    setOpenAddList(false);
  }, [dispatch, setOpenAddList]);

  const handleListNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
  return {
    handleAddList,
    handleListNameChange,
    handleClose,
    selectList,
    setSelectList,
  };
};

export default useAddList;
