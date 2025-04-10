import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // 꼭 import
import axios from "axios";
import { useNavigate } from "react-router-dom";

const prefix = "http://localhost:8080"

export default function KakaoCallback() {
  const navigate = useNavigate();
  const { loginContext } = useAuth();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      axios
        .get(`${prefix}/api/member/kakao?code=${code}`) 
        .then((res) => {
            console.log("백엔드 응답:", res.data);
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