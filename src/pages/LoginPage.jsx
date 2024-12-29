import React from "react";
import { KAKAO_AUTH_URL } from "../components/KakaoOAuth"
import { NAVER_AUTH_URL } from "../components/NaverOAuth"
import "./LoginPage.css";

const LoginPage = () => {
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleNaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <div className="login-page-container">
      <div className="login-window">
        <h1 className="login-title">단 하루, 오늘을 잘 사는 우리들의 투두</h1>
        <img
          src="/images/login_logo.png"
          alt="뚜두 로고"
          className="login-logo"
        />
        
        <div className="social-login-buttons">
          <button className="naver-login-button" onClick={handleNaverLogin}>
            <img
              src="/images/naver_logo.png"
              alt="Naver Logo"
              className="social-logo"
            />
            <span> 로 시작하기</span>
          </button>

          <button className="kakao-login-button" onClick={handleKakaoLogin}>
            <img
              src="/images/kakao_logo.png"
              alt="Kakao Logo"
              className="social-logo"
            />
            <span>kakao 로 시작하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
