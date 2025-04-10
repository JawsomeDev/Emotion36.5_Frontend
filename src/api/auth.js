import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";



export const signup = async (formData) => {
  const res = await axios.post(`${API_SERVER_HOST}/api/member/signup`, formData);
  return res.data;
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
  
  export const requestPasswordReset = async (email) => {
    const res = await axios.post(`${API_SERVER_HOST}/api/password/request-reset`, null, {
      params: { email },
    });
    return res.data;
  };

  export const resetPassword = async ({ token, newPassword, confirmPassword }) => {
    const res = await axios.post(`${API_SERVER_HOST}/api/password/reset`, {
      token,
      newPassword,
      confirmPassword,
    });
    return res.data;
  };
