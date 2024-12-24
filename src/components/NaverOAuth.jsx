const NAVER_CLIENT_ID = "VTFXvAwu4tZjVecOcW1h";
const NAVER_REDIRECT_URI = "http://localhost:3000/naver";

// state 생성
const generateState = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const STATE = generateState();
// localStorage.setItem('naver_state', STATE);

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;