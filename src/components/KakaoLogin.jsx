import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const getCodeFromURL = () => new URL(window.location.href).searchParams.get("code");

const Kakao = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const code = getCodeFromURL();
      if (!code) {
        console.log("인증 코드가 없습니다");
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/accounts/kakao/callback/?code=${code}`,
          { 
            withCredentials: true
          }
        );
      
        // 응답 데이터 
        // console.log("상태 코드:", response.status);
        // console.log("데이터:", response.data);

        if (!response.data.access_token) {
          throw new Error('토큰을 받아오지 못했습니다.');
        }

        // 쿠키 확인
        // console.log("저장 전 쿠키:", Cookies.get());
        
        // 쿠키 설정
        const { access_token, refresh_token, user_id } = response.data;
        Cookies.set("accessToken", access_token);
        Cookies.set("refreshToken", refresh_token);
        Cookies.set("userId", user_id);
        
        const savedToken = Cookies.get("accessToken");
        if (!savedToken) {
          throw new Error("토큰 저장 실패");
        }
        
        // console.log("저장 후 쿠키:", Cookies.get());

        // 마이페이지로 이동
        navigate("/mypage");
      
      } catch (error) {
        console.error("에러 메시지:", error.message);
        // if (error.response) {
        //   console.error("서버 응답:", error.response.data);
        //   console.error("상태 코드:", error.response.status);
        //   console.error("응답 헤더:", error.response.headers);
        // } else if (error.request) {
        //   console.error("요청 실패:", error.request);
        // }
      }
    };
  
    handleKakaoLogin();
  }, [navigate]);

  return (
    <div>
      <p>카카오 로그인 중입니다...</p>
    </div>
  );
};

export default Kakao;
