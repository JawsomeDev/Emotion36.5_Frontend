import { useState } from "react";
import { signup } from "../../api/auth";
import TermsOfServiceModal from "../common/TermsOfServiceModal";

export default function SignupForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    agreeToTerms: false, // ✅ 약관 동의 추가
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false); // ✅ 모달 상태 추가

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
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
    <>
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

        {/* 이용약관 동의 체크박스 */}
        <div className="flex items-start">
          <input
            type="checkbox"
            name="agreeToTerms"
            id="agreeToTerms"
            checked={form.agreeToTerms}
            onChange={handleChange}
            className="mt-1 mr-2"
          />
          <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
            <button
              type="button"
              className="underline text-blue-600"
              onClick={() => setIsTermsOpen(true)}
            >
              이용약관
            </button>
            에 동의합니다.
          </label>
        </div>
        {fieldErrors.agreeToTerms && (
          <p className="text-red-500 text-sm">{fieldErrors.agreeToTerms}</p>
        )}

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

      {/* 이용약관 모달 */}
      <TermsOfServiceModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </>
  );
}
