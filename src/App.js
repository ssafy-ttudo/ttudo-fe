import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import Kakao from './Login/Kakao';
import Naver from './Login/Naver';
import Mypage from './Mypage/Mypage';
function App() {
  return (
    <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path="/kakao" element={<Kakao />} />
          <Route path="/naver" element={<Naver />} />
          <Route path="/mypage" element ={<Mypage/>} />
        </Routes>
    </Router>
  );
}

function Home() {
  const name =localStorage.getItem('user')
  return (
    <div>
      {name}
    </div>
  );
}

export default App;
