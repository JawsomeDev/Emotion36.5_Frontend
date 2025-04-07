import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: `${API_SERVER_HOST}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청 인터셉터 - accessToken 자동 추가
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 - accessToken 만료시 refresh 요청 후 재시도
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {

  
      const originalRequest = error.config;
  
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
  
        try {
          const accessToken = localStorage.getItem("accessToken");
          const refreshToken = localStorage.getItem("refreshToken");
  
          console.log("🔁 리프레시 시도", accessToken, refreshToken);
  
          const res = await axiosInstance.post(
            `/member/refresh`,
            { refreshToken },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
  
  
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
  
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;