import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { clearUserAction, setUserAction } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
const useFirebaseAuthStateChanged = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user !== null) {
        dispatch(setUserAction({ uid: user.uid, email: user.email }));
      } else {
        dispatch(clearUserAction());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return;
};

export default useFirebaseAuthStateChanged;
