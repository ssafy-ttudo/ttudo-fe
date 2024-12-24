import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import KakaoLogin from "./components/KakaoLogin"
import NaverLogin from "./components/NaverLogin"
import MyPage from "./pages/MyPage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/kakao" element={<KakaoLogin />} />
        <Route path="/naver" element={<NaverLogin />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
