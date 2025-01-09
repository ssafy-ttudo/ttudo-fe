import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getCodeFromURL = () => new URL(window.location.href).searchParams.get("code");
const getStateFromURL = () => new URL(window.location.href).searchParams.get("state");

const Naver = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNaverLogin = async () => {
      const code = getCodeFromURL();
      const state = getStateFromURL();
      const storedState = localStorage.getItem("naver_state");

      console.log("Code from URL:", code);
      console.log("State from URL:", state);
      console.log("Stored State:", storedState);

      if (!code || !state) {
        console.error("인증 코드 또는 상태값이 없습니다.");
        return;
      }

      if (state !== storedState) {
        console.error("State 값 불일치");
        alert("잘못된 인증 요청입니다. 다시 시도해주세요.");
        return;
      }

      try {
        // 네이버 API에 요청
        const response = await axios.get(
          `http://127.0.0.1:8000/accounts/naver/callback/`,
          {
            params: { code, state },
          }
        );

        // API 응답 데이터 확인
        if (!response.data || !response.data.jwt_access_token) {
          throw new Error("토큰을 받아오지 못했습니다.");
        }

        console.log("응답 데이터:", response.data);

        // JWT 토큰 및 사용자 정보 저장
        localStorage.setItem("jwtAccessToken", response.data.jwt_access_token);
        localStorage.setItem("jwtRefreshToken", response.data.jwt_refresh_token);
        localStorage.setItem("userId", response.data.user_id);

        // 리다이렉트
        navigate(`/mypage/${response.data.user_id}`);
      } catch (error) {
        console.error("로그인 처리 중 에러 발생:", error.message);
        alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    };

    handleNaverLogin();
  }, [navigate]);

  return (
    <div>
      <p>네이버 로그인 중입니다...</p>
    </div>
  );
};

export default Naver;
