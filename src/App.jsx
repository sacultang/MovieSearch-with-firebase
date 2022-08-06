import React, { useEffect } from 'react';
import Layout from './components/Common/Layout';
import Home from './pages/home/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import MoviePage from './pages/movies/MoviePage';
import TvPage from './pages/tv/TvPage';
import Join from './pages/register/Join';
import Login from './pages/register/Login';
import Favorite from './pages/favorite/Favorite';
import Profile from './pages/profile/Profile';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUserAction, clearUserAction } from './store/userSlice';
import { Stack, CircularProgress } from '@mui/material';
import './firebase';
function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (!!user) {
        dispatch(setUserAction(user));
      } else {
        dispatch(clearUserAction());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress color="secondary" size={50} />
      </Stack>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/movie/:query" element={<MoviePage />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/tv/:query" element={<TvPage />} />
        <Route path="/join" element={user ? <Navigate to="/" /> : <Join />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/profile"
          element={!user ? <Navigate to="/login" /> : <Profile />}
        />
      </Route>
    </Routes>
  );
}

export default App;
