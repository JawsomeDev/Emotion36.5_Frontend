import { useState } from "react";
import { signup } from "../../api/auth";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError ] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const result = await signup({ email, password, confirmPassword, nickname });
      console.log("회원가입 성공:", result);
      setSuccess(true);
    } catch (err) {
      setError(err.error || "회원가입 실패");
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
        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
            닉네임
        </label> 
        <input
            type="nickname"
            placeholder="닉네임을 입력하세요"
            className="w-full p-2 border rounded"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
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
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            비밀번호 확인
        </label> 
        <input
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            className="w-full p-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">회원가입이 완료되었습니다!</p>}

        <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
            회원가입
        </button>
        </form>
    );
}
