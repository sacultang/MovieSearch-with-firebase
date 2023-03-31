import React, { lazy, Suspense } from 'react';
import '../firebase';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

import useFirebaseRef from './hooks/useFirebaseRef';
import useFirebaseAuthStateChanged from './hooks/useFirebaseAuthStateChanged';

import Join from '../pages/register/Join';
import Login from '../pages/register/Login';
import Loader from '../components/common/Loader';
import AuthenticationRoute from '../router/AuthenticationRoute';
const MoviePage = lazy(() => import('../pages/movies/MoviePage'));
const TvPage = lazy(() => import('../pages/tv/TvPage'));
const SearchMain = lazy(() => import('../pages/search/SearchMain'));
const SearchResults = lazy(() => import('../pages/search/SearchResults'));
const DetailsPage = lazy(() => import('../pages/details/DetailsPage'));
const Layout = lazy(() => import('../pages/home/common/Layout'));
const Home = lazy(() => import('../pages/home/Home'));
const Favorite = lazy(() => import('../pages/favorite/Favorite'));
const PageNotFound = lazy(() => import('../pages/Error/PageNotFound'));
const ListPage = lazy(() => import('../pages/favorite/ListPage'));

const Router = () => {
  const user = useSelector((state: RootState) => state.user.user);
  useFirebaseRef(user);
  useFirebaseAuthStateChanged();

  return (
    <Suspense fallback={<Loader />}>
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
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/list/:query" element={<ListPage />} />
          </Route>
          <Route path="/error" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
