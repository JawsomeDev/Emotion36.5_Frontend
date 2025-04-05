import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";

export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_SERVER_HOST}/api/member/signup`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "회원가입 중 오류가 발생했습니다." };
  }
};

export async function login({ email, password }) {
    const params = new URLSearchParams();
    params.append("username", email); 
    params.append("password", password);
  
    const res = await axios.post(
      `${API_SERVER_HOST}/api/member/login`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  
    const data = res.data;
  
    const { id, accessToken, refreshToken, nickname, email: userEmail, roleNames } = data;
  
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  
    return {
      id,
      nickname,
      email: userEmail,
      roleNames,
    };
  }
  
  