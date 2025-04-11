import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: `${API_SERVER_HOST}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 요청 인터셉터: accessToken 없으면 보호된 API 요청 차단
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  // /member, /password 등 public 경로는 예외 처리 (옵션)
  const publicPaths = ["/member", "/password"];
  const isPublic = publicPaths.some((path) => config.url.startsWith(path));

  if (!token && !isPublic) {
    return Promise.reject({
      response: {
        status: 401,
        data: { error: "로그인이 필요합니다." },
      },
    });
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

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

        const res = await axios.post(
          `${API_SERVER_HOST}/api/member/refresh`,
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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
