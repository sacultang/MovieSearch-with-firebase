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
      const docRef = doc(db, FIREBASE_REF.USERS, user.email as string);
      const myListRef = collection(docRef, FIREBASE_REF.LIST);
      if (openAddList) {
        try {
          await setDoc(doc(myListRef, encodeURIComponent(listName)), {
            list: [selectMovie],
          }).then(() => {
            dispatch(
              setToastAction({
                isOpen: true,
                text: '목록이 생성되었습니다.',
              })
            );
          });
        } catch (e) {
          throw new Error(`error ${e}`);
        } finally {
          dispatch(setListModalAction(false));
          setOpenAddList(false);
          setTimeout(() => {
            dispatch(setToastAction({ isOpen: false }));
          }, 3000);
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
          }).then(() => {
            dispatch(
              setToastAction({
                isOpen: true,
                text: '목록에 추가되었습니다.',
              })
            );
          });
        } catch (e) {
          throw new Error(`error ${e}`);
        } finally {
          dispatch(setListModalAction(false));
          setOpenAddList(false);
          setTimeout(() => {
            dispatch(setToastAction({ isOpen: false }));
          }, 3000);
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
