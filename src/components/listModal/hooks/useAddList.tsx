import { collection, setDoc, getDoc, doc } from 'firebase/firestore';

import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FIREBASE_REF } from '../../../constants/firebaseRef';
import { db } from '../../../firebase';
import { RootState } from '../../../store/store';
import { setListModalAction, setToastAction } from '../../../store/toastSlice';
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
  const toastMessage = openAddList
    ? '목록이 생성되었습니다.'
    : '목록에 추가되었습니다.';
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
  const docRef = doc(db, FIREBASE_REF.USERS, user.email as string);
  const myListRef = collection(docRef, FIREBASE_REF.LIST);

  const handleAddList = async () => {
    if (!user?.uid) return;
    if (!listName && openAddList) {
      alert('목록 이름을 써주세요');
      return;
    }
    const listDocRef = openAddList
      ? doc(myListRef, encodeURIComponent(listName))
      : doc(myListRef, encodeURIComponent(selectList));
    const listDoc = await getDoc(listDocRef);
    const existingList: IMovieResult[] | SimilarType = listDoc.data()?.list;

    try {
      if (!openAddList && checkListMovieId(selectMovie.id, existingList)) {
        alert('이미 해당 영화/TV가 리스트에 있습니다.');
        return;
      }

      await setDoc(listDocRef, {
        list: openAddList ? [selectMovie] : [selectMovie, ...existingList],
      });

      dispatch(
        setToastAction({
          isOpen: true,
          text: toastMessage,
        })
      );

      setTimeout(() => {
        dispatch(setToastAction({ isOpen: false }));
      }, 3000);
    } catch (e) {
      throw new Error(`error ${e}`);
    } finally {
      dispatch(setListModalAction(false));
      setOpenAddList(false);
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
