import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginContext } = useAuth(); // ✅

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login({ email, password });
      console.log("로그인 성공:", user);
      loginContext(user); // ✅ context 업데이트
      navigate("/"); // 홈으로 이동
    } catch (err) {
      console.error("로그인 실패:", err);
      setError("로그인 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        이메일
      </label>
      <input
        type="email"
        placeholder="이메일을 입력하세요"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        비밀번호
      </label>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="text-right mt-2">
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="text-sm text-blue-600 hover:underline"
        >
          비밀번호를 잊으셨나요?
        </button>
      </div>
      <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
        로그인
      </button>
      
    </form>
  );
}
