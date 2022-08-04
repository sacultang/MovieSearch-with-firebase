import React from 'react';
import Layout from './components/Common/Layout';
import Home from './pages/home/Home';
import { Routes, Route } from 'react-router-dom';
import MoviePage from './pages/movies/MoviePage';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/movie/:query" element={<MoviePage />} />
      </Route>
    </Routes>
  );
}

export default App;
