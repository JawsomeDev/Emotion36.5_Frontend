// src/pages/KakaoCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { kakaoLogin } from "../../api/kakaoApi";

export default function KakaoCallback() {
  const navigate = useNavigate();
  const { loginContext } = useAuth();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      kakaoLogin(code)
        .then((res) => {
          const { accessToken, refreshToken, id, email, nickname, isSocial } = res.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          const userData = { id, nickname, email, isSocial };
          localStorage.setItem("user", JSON.stringify(userData));
          loginContext(userData);

          navigate("/");
        })
        .catch(() => {
          alert("카카오 로그인 실패");
          navigate("/login");
        });
    }
  }, [navigate]);
}
