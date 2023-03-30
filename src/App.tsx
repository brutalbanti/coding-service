import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Authentication } from './Pages/Authentication';
import { Home } from './Pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/authentication' element={<Authentication/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
