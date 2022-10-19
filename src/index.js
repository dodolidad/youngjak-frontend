import ReactDOM from 'react-dom/client';
import Layout from './Layout';

// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from './Header';
// import Home from './Home';
// import Join from './Join';
// import Play from './Play';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Layout />
  // <BrowserRouter>
  //   <Header />
  //   <Routes>
  //     <Route path="/*" element={<Home />}></Route>
  //     <Route path="/home" element={<Home />}></Route>
  //     <Route path="/join" element={<Join />}></Route>
  //     <Route path="/play" element={localStorage.getItem('userId') === null ? <Home tryLogin="true" /> : <Play />}></Route>
  //   </Routes>
  // </BrowserRouter>
);