import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '.';
import { doc, collection } from 'firebase/firestore';
// export const unsubscribe = onAuthStateChanged(getAuth(),(user) => {
//   if (user !== null) {
//     dispatch(setUserAction({ uid: user.uid, email: user.email }));
//   } else {
//     dispatch(clearUserAction());
//   }
// });)

export const getFavoriteRef = (email: string | null) => {
  if (email !== null) {
    const docRef = doc(db, 'users', email);
    const favoriteRef = collection(docRef, 'favorite');
    return favoriteRef;
  }
};
