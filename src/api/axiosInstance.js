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
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(
          `${API_SERVER_HOST}/api/member/refresh`,
          null,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              refreshToken,
            },
          }
        );

        const {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        } = res.data;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("리프레시 실패", refreshError);
        window.location.href = "/login"; // 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;