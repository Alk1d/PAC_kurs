import React from 'react';
import { Route, Routes } from 'react-router-dom' 
import { LoginPage } from './pages';
import { RoutesPaths } from './constants/commonConstants';
import { BooksPage } from './pages/books';
import './styles/globalStyles.scss'

export const App: React.FC = () => {
  return(
  <Routes>
    <Route path={RoutesPaths.Login} element={<LoginPage />} />
    <Route path={RoutesPaths.Books} element={<BooksPage />} />
    <Route path={'*'} element={<LoginPage />} />
  </Routes>
  );
};
