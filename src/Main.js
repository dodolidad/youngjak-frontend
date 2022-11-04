import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Join from './Join';
// import Listen from './Listen';
import MyText from './MyText';
import CommAlert from './CommAlert';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

export default function Main() {
  const headerRef = React.useRef();
  const commAlertRef = React.useRef();
  const homeRef = React.useRef();
  const loginRef = React.useRef();
  const joinRef = React.useRef();
  const privateRouteRef = React.useRef();
  
  const openCommAlert = (commAlertType, commAlertMsg) => {
    commAlertRef.current.setCommAlertType(commAlertType);
    commAlertRef.current.setCommAlertMsg(commAlertMsg);
    commAlertRef.current.handleClickOpen();
  }

  return (
    <BrowserRouter>
      <Header ref={headerRef} openCommAlert={openCommAlert} />
      <Routes>
        <Route path="/*" element={ <Home ref={homeRef} openCommAlert={openCommAlert} /> }></Route>
        <Route path="/join" element={ <Join ref={joinRef} openCommAlert={openCommAlert} /> }></Route>
        <Route path="/login" element={ <Login ref={loginRef} openCommAlert={openCommAlert} /> }></Route>
        <Route path="/mytext" element={ <PrivateRoute ref={privateRouteRef} openCommAlert={openCommAlert} comp={<MyText openCommAlert={openCommAlert} />} /> }></Route>
      </Routes>
      <CommAlert ref={commAlertRef} />
    </BrowserRouter>
  )
}