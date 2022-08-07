import React, { useEffect, lazy, Suspense } from 'react';
import './firebase';

import { Routes, Route, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUserAction, clearUserAction } from './store/userSlice';

const Layout = lazy(() => import('./components/Common/Layout'));
const Home = lazy(() => import('./pages/home/Home'));
const MoviePage = lazy(() => import('./pages/movies/MoviePage'));
const TvPage = lazy(() => import('./pages/tv/TvPage'));
const Join = lazy(() => import('./pages/register/Join'));
const Login = lazy(() => import('./pages/register/Login'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const Loader = lazy(() => import('./components/Common/Loader'));

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
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/movie" element={<MoviePage />} />
          <Route path="/movie/:query" element={<MoviePage />} />
          <Route path="/tv" element={<TvPage />} />
          <Route path="/tv/:query" element={<TvPage />} />
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
    </Suspense>
  );
}

export default App;
