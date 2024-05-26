import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './component/main';
import userinfo from './component/userplus/userinfo'
import userchoice from './component/userminus/userchoice';
import realmain from './component/realmain';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Main}></Route>
        <Route path='/main' Component={realmain}></Route>
        <Route path='/userinfo' Component={userinfo}></Route>
        <Route path='/userchoice' Component={userchoice}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
