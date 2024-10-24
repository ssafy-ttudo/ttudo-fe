import React, {useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const getCodeFromURL = () => new URL(window.location.href).searchParams.get('code');

const Kakao = () => {
    const navigate = useNavigate();


    useEffect(() => {
        const handleKakaoLogin = async () => {
            const code = getCodeFromURL();
            if (code) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/login/kakao/callback?code=${code}`, {
                        withCredentials: true
                    });
                    
                    if (response.data.message === '로그인 성공') {
                        console.log('로그인 성공:', response.data);
                        const payload = JSON.parse(atob(response.data.access.split('.')[1]));
                        Cookies.set('accessToken', response.data.access, { expires: 1 }); // 1일 유효
                        Cookies.set('refreshToken', response.data.refresh, { expires: 30 }); // 30일 유효
                        Cookies.set('user_id', payload.user_id, { expires: 1 });
                        
                    }
                } catch (error) {
                    console.error('API 호출 오류:', error);
                    
            }
        };
    }
        handleKakaoLogin();
    }, [navigate]);


    return (
        <div>
            <p>카카오 로그인 중입니다.</p>
            <p>잠시만 기다려주세요!</p>
        </div>
    );
};

export default Kakao;
