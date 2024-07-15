import React from 'react';
import GlobalStyles from '../components/styles/Global';
import Router from './Router';
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
      <GlobalStyles/>
      <RouterProvider router={Router}/>
    </>
  );
}

export default App;
