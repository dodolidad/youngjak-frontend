import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Join from './Join';
import Listen from './Listen';
import MyBook from './MyBook';
import CommAlert from './CommAlert';
import TtsPlayer from './TtsPlayer';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

export default function Main() {
  console.log('Main.js rendering');
  const headerRef = React.useRef();
  const commAlertRef = React.useRef();
  const homeRef = React.useRef();
  const ttsPlayerRef = React.useRef();
  const loginRef = React.useRef();
  const joinRef = React.useRef();
  const privateRouteRef = React.useRef();
  
  const openCommAlert = (commAlertType, commAlertMsg) => {
    console.log('commAlertType' + commAlertType);
    console.log('commAlertMsg' + commAlertMsg);
    commAlertRef.current.setCommAlertType(commAlertType);
    commAlertRef.current.setCommAlertMsg(commAlertMsg);
    commAlertRef.current.handleClickOpen();
  }

  const play = (text, lang, voice) => {
    ttsPlayerRef.current.play(text, lang, voice);
  }

  return (
    <BrowserRouter>
      <Header ref={headerRef} openCommAlert={openCommAlert} />
      <Routes>
        <Route path="/*" element={ <Home ref={homeRef} openCommAlert={openCommAlert} play={play} /> }></Route>
        <Route path="/join" element={ <Join ref={joinRef} openCommAlert={openCommAlert} /> }></Route>
        <Route path="/login" element={ <Login ref={loginRef} openCommAlert={openCommAlert} /> }></Route>
        <Route path="/listen" element={ <PrivateRoute ref={privateRouteRef} openCommAlert={openCommAlert} comp={<Listen openCommAlert={openCommAlert} play={play} />} /> }></Route>
        <Route path="/mybook" element={ <PrivateRoute ref={privateRouteRef} openCommAlert={openCommAlert} comp={<MyBook openCommAlert={openCommAlert} />} /> }></Route>
      </Routes>
      <CommAlert ref={commAlertRef} />
      <TtsPlayer ref={ttsPlayerRef} openCommAlert={openCommAlert} />
    </BrowserRouter>
  )
}