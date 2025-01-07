import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const getCodeFromURL = () => new URL(window.location.href).searchParams.get("code");
const getStateFromURL = () => new URL(window.location.href).searchParams.get("state");

const Naver = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNaverLogin = async () => {
      const code = getCodeFromURL();
      const state = getStateFromURL();
      const storedState = localStorage.getItem('naver_state');

      // console.log("Code from URL:", code);
      // console.log("State from URL:", state);
      // console.log("Stored State:", storedState);

      if (!code || !state) {
        console.log("인증 코드 또는 상태값이 없습니다");
        return;
      }

      if (state !== storedState) {
        console.error("State 값 불일치");
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/accounts/naver/callback/`,
          {
            params: {
              code,
              state,
            },
          }
        );
        

        // 응답 데이터 
        // console.log("상태 코드:", response.status);
        // console.log("데이터:", response.data);

        if (!response.data.access) {
          throw new Error('토큰을 받아오지 못했습니다.');
        }

        // 쿠키 확인
        // console.log("저장 전 쿠키:", Cookies.get());
        console.log('response',response.data)
        // 쿠키 저장
        // const payload = JSON.parse(atob(response.data.access.split(".")[1]));
        // Cookies.set("accessToken", response.data.access, { expires: 1 });
        // Cookies.set("refreshToken", response.data.refresh, { expires: 30 });
        // Cookies.set("userId", payload.user_id, { expires: 1 });
        localStorage.setItem("accessToken",response.data.access)
        localStorage.setItem("userId",response.data.user_id)


        const savedToken = Cookies.get("accessToken");
        if (!savedToken) {
          throw new Error("토큰 저장 실패");
        }

        // console.log("저장 후 쿠키:", Cookies.get());
        // console.log("네이버 로그인 성공");

        navigate(`/mypage/${response.data.user_id}`);


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

    handleNaverLogin();
  }, [navigate]);

  return (
    <div>
      <p>네이버 로그인 중입니다...</p>
    </div>
  );
};

export default Naver;
