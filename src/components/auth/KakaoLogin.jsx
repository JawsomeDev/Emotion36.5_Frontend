import { getKakaoLoginLink } from "../../api/kakaoApi";
import kakaoIcon from "../../assets/kakao-icon.png";

export default function KakaoLoginButton() {
  const handleKakaoLogin = () => {
    window.location.href = getKakaoLoginLink();
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#ffdf33] text-black font-semibold py-3 px-4 rounded-lg transition"
    >
      <img src={kakaoIcon} alt="kakao" className="w-6 h-6 rounded-full" />
      <span className="text-base">Kakao 계정으로 로그인</span>
    </button>
  );
}
