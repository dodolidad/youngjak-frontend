import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Join from './Join';
import Listen from './Listen';
import MyBook from './MyBook';
import CommAlert from './CommAlert';
import TtsPlayer from './TtsPlayer';

export default function Main() {
  console.log('Main.js rendering');
  const commAlertRef = React.useRef();
  const homeRef = React.useRef();
  const TtsPlayerRef = React.useRef();
  
  const openCommAlert = (commAlertType, commAlertMsg) => {
    commAlertRef.current.setCommAlertType(commAlertType);
    commAlertRef.current.setCommAlertMsg(commAlertMsg);
    commAlertRef.current.handleClickOpen();
  }

  const play = (text, lang, voice) => {
    TtsPlayerRef.current.play(text, lang, voice);
  } 

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/*" element={<Home ref={homeRef} openCommAlert={openCommAlert} play={play} />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/listen" element={<Listen />}></Route>
        <Route path="/mybook" element={<MyBook />}></Route>
      </Routes>
      <CommAlert ref={commAlertRef} />
      <TtsPlayer ref={TtsPlayerRef} openCommAlert={openCommAlert} />
    </BrowserRouter>
  )
}