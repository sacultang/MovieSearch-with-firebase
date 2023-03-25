import React from 'react';
import '../firebase';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

import useFirebaseRef from './hooks/useFirebaseRef';
import useFirebaseAuthStateChanged from './hooks/useFirebaseAuthStateChanged';

import MoviePage from '../pages/movies/MoviePage';
import TvPage from '../pages/tv/TvPage';
import SearchMain from '../pages/search/SearchMain';
import SearchResults from '../pages/search/SearchMain';
import DetailsPage from '../pages/details/DetailsPage';
import Join from '../pages/register/Join';
import Login from '../pages/register/Login';
import Layout from '../pages/home/common/Layout';
import Home from '../pages/home/Home';
import Favorite from '../pages/favorite/Favorite';
import PageNotFound from '../pages/Error/PageNotFound';
import ListPage from '../pages/favorite/ListPage';
import AuthenticationRoute from '../router/AuthenticationRoute';

const Router = () => {
  const user = useSelector((state: RootState) => state.user.user);
  useFirebaseRef(user);
  useFirebaseAuthStateChanged();

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
