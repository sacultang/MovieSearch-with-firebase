import React, { useEffect } from 'react';
import './firebase';

import { Routes, Route, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUserAction, clearUserAction } from './store/userSlice';
import Layout from './components/Common/Layout';
import Home from './pages/home/Home';
import MoviePage from './pages/movies/MoviePage';
import TvPage from './pages/tv/TvPage';
import Join from './pages/register/Join';
import Login from './pages/register/Login';
import Profile from './pages/profile/Profile';
import Loader from './components/Common/Loader';
import SearchMain from './pages/home/search/SearchMain';
import SearchResults from './pages/home/search/SearchResults';
function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const loading = useSelector((state) => state.user.loading);
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

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/movie/:query" element={<MoviePage />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/tv/:query" element={<TvPage />} />
        <Route path="/search" element={<SearchMain />}>
          <Route path=":query" element={<SearchResults />} />
        </Route>
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
      </Route>
    </Routes>
  );
}

export default App;
