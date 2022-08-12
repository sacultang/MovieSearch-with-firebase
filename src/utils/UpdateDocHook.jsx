import { useCallback } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, setDoc } from 'firebase/firestore';

const UpdateDocHook = (user) => {
  let docRef;
  if (!!user?.uid) {
    docRef = doc(db, 'users', user.email);
  }
  const updateFavorite = useCallback(
    async (userFavorite) => {
      try {
        await updateDoc(docRef, { favorite: userFavorite });

        // const res = await setDoc(docRef, { favorite: userFavorite });
        // console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    [docRef]
  );
  return updateFavorite;
};

export default UpdateDocHook;
