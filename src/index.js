import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Join from './Join';
import Listen from './Listen';
import MyBook from './MyBook';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/*" element={<Home />}></Route>
      <Route path="/join" element={<Join />}></Route>
      <Route path="/listen" element={<Listen />}></Route>
      <Route path="/mybook" element={<MyBook />}></Route>
    </Routes>
  </BrowserRouter>
);