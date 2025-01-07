import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import KakaoLogin from "./components/KakaoLogin";
import NaverLogin from "./components/NaverLogin";
import MyPage from "./pages/MyPage";
import Board from "./components/board/Board";
import BoardDetail from "./components/board/BoardDetail";
import BoardCreate from './components/board/BoardCreate';
import BoardEdit from './components/board/BoardEdit';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* 메인/로그인 관련 라우트 */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/kakao" element={<KakaoLogin />} />
          <Route path="/naver" element={<NaverLogin />} />
          <Route path="/mypage/:userId" element={<MyPage />} />

          {/* 게시판 관련 라우트 */}
          <Route path="/boards" element={<Board />} />
          <Route path="/article/:articleId/detail_update_delete" element={<BoardDetail />} />
          <Route path="/article/create" element={<BoardCreate />} />
          <Route path="/article/:articleId/edit" element={<BoardEdit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
