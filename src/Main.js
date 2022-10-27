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

export default function Main() {
  console.log('Main.js rendering');
  const HeaderRef = React.useRef();
  const commAlertRef = React.useRef();
  const homeRef = React.useRef();
  const TtsPlayerRef = React.useRef();
  const LoginRef = React.useRef();
  const JoinRef = React.useRef();
  
  const openCommAlert = (commAlertType, commAlertMsg) => {
    console.log('commAlertType' + commAlertType);
    console.log('commAlertMsg' + commAlertMsg);
    commAlertRef.current.setCommAlertType(commAlertType);
    commAlertRef.current.setCommAlertMsg(commAlertMsg);
    commAlertRef.current.handleClickOpen();
  }

  const play = (text, lang, voice) => {
    TtsPlayerRef.current.play(text, lang, voice);
  }

  const openLogin = () => {
    LoginRef.current.handleClickOpen();
  }

  return (
    <BrowserRouter>
      <Header ref={HeaderRef} openCommAlert={openCommAlert} openLogin={openLogin} />
      <Routes>
        <Route path="/*" element={<Home ref={homeRef} openCommAlert={openCommAlert} play={play} />}></Route>
        <Route path="/join" element={<Join ref={JoinRef} openCommAlert={openCommAlert} openLogin={openLogin} />}></Route>
        <Route path="/listen" element={<Listen />}></Route>
        <Route path="/mybook" element={<MyBook />}></Route>
      </Routes>
      <CommAlert ref={commAlertRef} />
      <TtsPlayer ref={TtsPlayerRef} openCommAlert={openCommAlert} />
      <Login ref={LoginRef} openCommAlert={openCommAlert} />
    </BrowserRouter>
  )
}