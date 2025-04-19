import axios from "axios";

export const getKakaoLoginLink = () => {
    const rest_api_key = 'c01a570f216b6d37b9b32f5c513baebb';
    const redirect_uri = 'http://localhost:5173/member/kakao';
    const auth_code_path = 'https://kauth.kakao.com/oauth/authorize';
  
    return `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  };
  

  export const kakaoLogin = (code) => {
    return axios.get(`/api/member/kakao?code=${code}`);
  };