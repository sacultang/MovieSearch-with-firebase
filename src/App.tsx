import { useEffect, lazy, Suspense } from 'react';
import './firebase';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUserAction, clearUserAction } from './store/userSlice';
import Layout from './pages/home/common/Layout';
import Home from './pages/home/Home';
import MoviePage from './pages/movies/MoviePage';
import TvPage from './pages/tv/TvPage';
import Join from './pages/register/Join';
import Login from './pages/register/Login';
import Profile from './pages/profile/Profile';
import Loader from './components/Common/Loader';
import SearchMain from './pages/search/SearchMain';
import SearchResults from './pages/search/SearchResults';
import DetailsPage from './pages/details/DetailsPage';
import { RootState } from './store/store';
import { db } from './firebase';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { setFavoriteAction } from './store/favoriteListSlice';
import Favorite from './pages/favorite/Favorite';
import PageNotFound from './pages/Error/PageNotFound';
import ListPage from './pages/favorite/ListPage';
function App() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (!!user) {
        // const docRef = doc(db, 'users', user.email!);
        dispatch(setUserAction({ uid: user.uid, email: user.email }));
        // const getData = async () => {
        //   const docSnap = await getDoc(docRef);
        //   const results = docSnap.data()?.favorite;
        //   results.map((item: any) => setFavoriteAction(item));
        // };

        // getData();
      } else {
        dispatch(clearUserAction());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  // const getFavoList = async () => {
  //   const docRef = doc(db, 'users', user.email!);
  //   const favoriteRef = collection(docRef, 'favorite');
  //   getDocs(favoriteRef).then(async (res) => {
  //     const mov = res.docs.map((item) => ({
  //       data: item.data()?.movie,
  //       id: item.data()?.id,
  //     }));
  //     await dispatch(setFavoriteAction(mov));
  //   });
  // };
  useEffect(() => {
    if (!!user.uid) {
      // getFavoList();
      const docRef = doc(db, 'users', user.email!);
      const favoriteRef = collection(docRef, 'favorite');

      const unsubs = onSnapshot(favoriteRef, (snapshot) => {
        const res = snapshot.docs.map((doc) => ({
          id: doc.id,
          movie: doc.data()?.movie,
        }));

        dispatch(setFavoriteAction(res));
      });
      return () => {
        unsubs();
      };
    }
  }, [dispatch, user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/movie/:query" element={<MoviePage />} />

        <Route path="/tv/:query" element={<TvPage />} />

        <Route path="/search" element={<SearchMain />}>
          <Route path=":query" element={<SearchResults />} />
        </Route>
        <Route path="/details/:type/:id" element={<DetailsPage />} />
        <Route
          path="/join"
          element={user?.uid ? <Navigate to="/" /> : <Join />}
        />
        <Route
          path="/login"
          element={user?.uid ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/profile"
          element={!user?.uid ? <Navigate to="/login" /> : <Profile />}
        />
        <Route
          path="/favorite"
          element={!user?.uid ? <Navigate to="/login" /> : <Favorite />}
        />
        <Route
          path="/list/:query"
          element={!user?.uid ? <Navigate to="/login" /> : <ListPage />}
        />
        <Route path="/error" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
