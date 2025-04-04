import { useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("회원가입 요청:", { email, nickname, password, confirmPassword });
    // 실제 회원가입 API 연동 필요
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
        <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
            회원가입
        </button>
        </form>
    );
}
