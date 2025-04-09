import { useAuth } from "../components/context/AuthContext";
import LoginForm from "../components/auth/LoginForm"
import SignupForm from "../components/auth/SignUpForm"
import { Thermometer } from "lucide-react";
import KakaoLoginButton from "../components/auth/KakaoLogin";

export default function LoginPage() {
  const { isLoginMode, toggleMode } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-xl border">
      <div className="text-center mb-6">
            <Thermometer className="mx-auto w-6 h-6 text-gray-700" />

            <h2 className="text-2xl font-bold text-gray-900">내 감정온도 36.5도</h2>

            <p className="text-sm text-gray-500 mt-1">
                감정을 기록하고, 분석하고, 맞춤형 힐링 콘텐츠를 추천받는 서비스
            </p>
            </div>
        <div className="flex mb-6">
          <button
            className={`w-1/2 py-2 font-bold text-center border-b-2 ${
              isLoginMode ? "text-black border-black" : "text-gray-400 border-transparent"
            }`}
            onClick={() => !isLoginMode && toggleMode()}
          >
            로그인
          </button>
          <button
            className={`w-1/2 py-2 font-bold text-center border-b-2 ${
              !isLoginMode ? "text-black border-black" : "text-gray-400 border-transparent"
            }`}
            onClick={() => isLoginMode && toggleMode()}
          >
            회원가입
          </button>
        </div>
        {isLoginMode ? <LoginForm /> : <SignupForm />}
        <div className="mt-4 text-center text-gray-500">또는</div>
        <div className="flex flex-col gap-2 mt-2">
          {/* <button>Google 계정</button> 등 다른 버튼도 나중에 여기에 */}
          <KakaoLoginButton />
        </div>
      </div>
    </div>
  );
}