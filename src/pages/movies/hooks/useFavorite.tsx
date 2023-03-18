import React, { useCallback, useState } from 'react';
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

const useFavorite = (movie: IMovieResult | Similrar) => {
  const [anchorEl, setAnchorEl] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const userFavorite = useSelector(
    (state: RootState) => state.favorite.favoriteMovie
  );

  const isFavoriteChecked = checkFavoriteMovieId(movie.id, userFavorite);

  const handleFavorite = useCallback(
    async (
      e: React.MouseEvent<HTMLButtonElement>,
      movie: IMovieResult | Similrar
    ) => {
      e.preventDefault();
      if (user?.uid) {
        dispatch(setLoginAlertAction(false));
        const docRef = doc(db, 'users', user.email as string);
        const favoriteRef = collection(docRef, 'favorite');
        const favoriteDocRef = doc(favoriteRef, movie.id.toString());
        try {
          if (isFavoriteChecked) {
            await deleteDoc(favoriteDocRef).then(() => {
              dispatch(
                setToastAction({
                  isOpen: true,
                  text: '즐겨찾기에서 삭제되었습니다.',
                })
              );
            });
          } else {
            await setDoc(doc(favoriteRef, movie.id.toString()), {
              movie,
            }).then(() => {
              dispatch(
                setToastAction({
                  isOpen: true,
                  text: '즐겨찾기에 추가되었습니다.',
                })
              );
            });
          }
        } catch (e) {
          throw new Error(`${e}`);
        } finally {
          setTimeout(() => {
            dispatch(setToastAction({ isOpen: false }));
          }, 3000);
        }
      } else {
        dispatch(setLoginAlertAction(true));
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
