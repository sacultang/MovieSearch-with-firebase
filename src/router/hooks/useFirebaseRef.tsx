import { useEffect } from 'react';
import { db } from '../../firebase';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { IMovieResult } from '../../types/movieType';
import { setFavoriteAction } from '../../store/favoriteListSlice';
import { useDispatch } from 'react-redux';
import { setListAction } from '../../store/listMovieSlice';
import { UserType } from '../../types/userType';

const useFirebaseRef = (user: UserType) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.uid) {
      const docRef = doc(db, 'users', user.email as string);
      const favoriteRef = collection(docRef, 'favorite');
      const myListRef = collection(docRef, 'list');
      const unsubsFavorite = onSnapshot(favoriteRef, (snapshot) => {
        const myFavoriteRes = snapshot.docs.map((doc) => ({
          id: doc.id,
          movie: doc.data().movie as IMovieResult,
        }));
        dispatch(setFavoriteAction(myFavoriteRes));
      });
      const unSubsList = onSnapshot(myListRef, (snapshot) => {
        const myListRes = snapshot.docs.map((doc) => ({
          id: doc.id,
          list: doc.data()?.list as IMovieResult[],
        }));
        dispatch(setListAction(myListRes));
      });
      return () => {
        unsubsFavorite();
        unSubsList();
      };
    }
  }, [dispatch, user]);
  return;
};

export default useFirebaseRef;
