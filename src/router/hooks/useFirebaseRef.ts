import { useEffect } from 'react';
import { db } from '../../firebase';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { setFavoriteAction } from '../../store/favoriteListSlice';
import { useDispatch } from 'react-redux';
import { setListAction } from '../../store/listMovieSlice';
import { UserType } from '../../types/userType';
import { FIREBASE_REF } from '../../constants/firebaseRef';

const useFirebaseRef = (user: UserType) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.uid) return;
    const docRef = doc(db, FIREBASE_REF.USERS, user.email as string);
    const favoriteRef = collection(docRef, FIREBASE_REF.FAVORITE);
    const myListRef = collection(docRef, FIREBASE_REF.LIST);
    const unsubsFavorite = onSnapshot(favoriteRef, (snapshot) => {
      const myFavoriteRes = snapshot.docs.map((doc) => ({
        id: doc.id,
        movie: doc.data().movie,
      }));
      dispatch(setFavoriteAction(myFavoriteRes));
    });
    const unSubsList = onSnapshot(myListRef, (snapshot) => {
      const myListRes = snapshot.docs.map((doc) => ({
        id: doc.id,
        list: doc.data()?.list,
      }));
      dispatch(setListAction(myListRes));
    });
    return () => {
      unsubsFavorite();
      unSubsList();
    };
  }, [dispatch, user]);
  return;
};

export default useFirebaseRef;
