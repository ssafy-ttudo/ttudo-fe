import React from 'react';
import './Loginstyle.css';
import loginImage from '../image/logo.png';
import naver from '../image/naver.png';
import kakao from '../image/kakao.png';
// import bubble from '../image/bubble.png'
import substract from '../image/Subtract.png'
const CLINT_ID = '8fa7861607ff5475f3002474de5bf575';
const KAKAO_REDIRECT_URI = 'http://localhost:3000/kakao';
const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${CLINT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const NAVER_CLIENT_ID = 'VTFXvAwu4tZjVecOcW1h';
const NAVER_REDIRECT_URI ='http://localhost:3000/naver';
const STATE ='false';
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;

function Login() {
  const handlekakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URI;
  };

  const handlenaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <div className="container">
      {/* <img src={bubble} alt="bubble" className="bubble" /> */}
      <div className="content">
        <img src={substract} alt="Logo" className="subtract" />
        <div className='subtitle'>단 하루, 오늘을 잘 사는 우리들의 투두</div>
        <div>
        <img src={loginImage} alt="Logo" className="logo" />
        </div>
        <button className="naver-button" onClick={handlenaverLogin}><img src={naver} alt="Logo" /></button>
        <button className="kakao-button" onClick={handlekakaoLogin}><img src={kakao} alt="Logo" /></button>
      </div>
    </div>
  );
}

export default Login;
