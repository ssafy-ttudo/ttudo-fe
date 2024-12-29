const KAKAO_CLIENT_ID = "8fa7861607ff5475f3002474de5bf575";
const KAKAO_REDIRECT_URI = "http://localhost:3000/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;