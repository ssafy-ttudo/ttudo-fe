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
        console.error("인증 코드가 없습니다.");
        return;
      }

      try {
        // Django 서버로 인증 코드 전달
        const response = await axios.get(
          `http://127.0.0.1:8000/accounts/kakao/callback/`,
          {
            params: { code }, // 인증 코드를 쿼리 파라미터로 전달
            withCredentials: true, // 쿠키를 포함한 요청
          }
        );

        // 응답 데이터 처리
        const { jwt_access_token, jwt_refresh_token, user_id } = response.data;

        if (!jwt_access_token || !jwt_refresh_token) {
          throw new Error("JWT 토큰을 받아오지 못했습니다.");
        }

        // JWT 토큰 및 사용자 정보 저장
        localStorage.setItem("jwtAccessToken", jwt_access_token, { expires: 1 }); // 1일 유효기간
        localStorage.setItem("jwtRefreshToken", jwt_refresh_token, { expires: 30 }); // 30일 유효기간
        localStorage.setItem("userId", user_id);

        console.log("JWT Access Token:", jwt_access_token);
        console.log("JWT Refresh Token:", jwt_refresh_token);

        // 마이페이지로 리다이렉트
        navigate(`/mypage/${user_id}`);
      } catch (error) {
        console.error("카카오 로그인 중 에러 발생:", error.message);
        if (error.response) {
          console.error("서버 응답:", error.response.data);
          console.error("상태 코드:", error.response.status);
          console.error("응답 헤더:", error.response.headers);
        } else if (error.request) {
          console.error("요청 실패:", error.request);
        }
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
