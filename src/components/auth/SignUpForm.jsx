import { useState } from "react";
import { signup } from "../../api/auth";

export default function SignupForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setFieldErrors({});
    setGeneralError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError("");
    setSuccess(false);

    try {
      await signup(form);
      setSuccess(true);
    } catch (err) {
      const res = err.response?.data;

      if (res?.fieldErrors) {
        setFieldErrors(res.fieldErrors);
      } else if (res?.error) {
        setGeneralError(res.error);
      } else {
        setGeneralError("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 이메일 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">이메일</label>
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력하세요"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={handleChange}
        />
        {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
      </div>

      {/* 닉네임 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">닉네임</label>
        <input
          type="text"
          name="nickname"
          placeholder="닉네임을 입력하세요"
          className="w-full p-2 border rounded"
          value={form.nickname}
          onChange={handleChange}
        />
        {fieldErrors.nickname && <p className="text-red-500 text-sm">{fieldErrors.nickname}</p>}
      </div>

      {/* 비밀번호 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          className="w-full p-2 border rounded"
          value={form.password}
          onChange={handleChange}
        />
        {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
      </div>

      {/* 비밀번호 확인 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호를 다시 입력하세요"
          className="w-full p-2 border rounded"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {fieldErrors.confirmPassword && (
          <p className="text-red-500 text-sm">{fieldErrors.confirmPassword}</p>
        )}
      </div>

      {/* 에러/성공 메시지 */}
      {generalError && <p className="text-red-500 text-sm">{generalError}</p>}
      {success && <p className="text-green-500 text-sm">회원가입이 완료되었습니다!</p>}

      {/* 제출 버튼 */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        회원가입
      </button>
    </form>
  );
}
