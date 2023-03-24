import React, { useCallback, useState, useMemo } from 'react';
import { collection, deleteDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import {
  setListModalAction,
  setLoginAlertAction,
  setToastAction,
} from '../../../store/toastSlice';
import { IMovieResult } from '../../../types/movieType';
import { Similrar } from '../../../types/similarType';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { checkFavoriteMovieId } from '../../../utils/checkFavoriteMovieId';
import { setListMovieAction } from '../../../store/listMovieSlice';
import { FIREBASE_REF } from '../../../constants/firebaseRef';

const useFavorite = (movie: IMovieResult | Similrar) => {
  const [anchorEl, setAnchorEl] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const userFavorite = useSelector(
    (state: RootState) => state.favorite.favoriteMovie
  );

  const isFavoriteChecked = useMemo(
    () => checkFavoriteMovieId(movie.id, userFavorite),
    [movie.id, userFavorite]
  );

  const handleFavorite = useCallback(
    async (
      e: React.MouseEvent<HTMLButtonElement>,
      movie: IMovieResult | Similrar
    ) => {
      e.preventDefault();
      if (!user?.uid) return dispatch(setLoginAlertAction(true));

      const docRef = doc(db, FIREBASE_REF.USERS, user.email as string);
      const favoriteRef = collection(docRef, FIREBASE_REF.FAVORITE);
      const favoriteDocRef = doc(favoriteRef, movie.id.toString());
      try {
        if (isFavoriteChecked) {
          await deleteDoc(favoriteDocRef);
          dispatch(
            setToastAction({
              isOpen: true,
              text: '즐겨찾기에서 삭제되었습니다.',
            })
          );
        } else {
          await setDoc(favoriteDocRef, { movie });
          dispatch(
            setToastAction({
              isOpen: true,
              text: '즐겨찾기에 추가되었습니다.',
            })
          );
        }
      } catch (e) {
        throw new Error(`${e}`);
      } finally {
        setTimeout(() => {
          dispatch(setToastAction({ isOpen: false }));
        }, 3000);
      }
    },
    [user, dispatch, isFavoriteChecked]
  );

  const handleOpenAddList = () => {
    if (user?.uid) {
      dispatch(setListMovieAction(movie));
      dispatch(setListModalAction(true));
      dispatch(setLoginAlertAction(false));
    } else {
      dispatch(setLoginAlertAction(true));
    }
    setAnchorEl(null);
  };
  const handleOpenMenu = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
    },
    []
  );
  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);
  return {
    handleFavorite,
    user,
    isFavoriteChecked,
    handleOpenAddList,
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
  };
};

export default useFavorite;
