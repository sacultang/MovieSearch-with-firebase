import { useEffect } from 'react';
import '../firebase';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUserAction, clearUserAction } from '../store/userSlice';
import Layout from '../pages/home/common/Layout';
import Home from '../pages/home/Home';
import MoviePage from '../pages/movies/MoviePage';
import TvPage from '../pages/tv/TvPage';
import Join from '../pages/register/Join';
import Login from '../pages/register/Login';
import Profile from '../pages/profile/Profile';
import Loader from '../components/common/Loader';
import SearchMain from '../pages/search/SearchMain';
import SearchResults from '../pages/search/SearchResults';
import DetailsPage from '../pages/details/DetailsPage';
import { RootState } from '../store/store';
import { db } from '../firebase';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { setFavoriteAction } from '../store/favoriteListSlice';
import Favorite from '../pages/favorite/Favorite';
import PageNotFound from '../pages/Error/PageNotFound';
import ListPage from '../pages/favorite/ListPage';
import AuthenticationRoute from '../router/AuthenticationRoute';

const Router = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (!!user) {
        dispatch(setUserAction({ uid: user.uid, email: user.email }));
      } else {
        dispatch(clearUserAction());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    if (!!user.uid) {
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

        <Route element={<AuthenticationRoute auth={false} uid={user.uid} />}>
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthenticationRoute auth={true} uid={user.uid} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/list/:query" element={<ListPage />} />
        </Route>
        <Route path="/error" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
