import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../../api/auth";

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setFieldErrors({});

    try {
      const res = await resetPassword({ token, newPassword, confirmPassword });

      if (typeof res === "string") {
        setMessage(res);
      } else if (res.success && res.message) {
        setMessage(res.message);
      }
    } catch (err) {
      const data = err.response?.data;
      if (data?.fieldErrors) {
        setFieldErrors(data.fieldErrors);
      } else if (data?.error) {
        setError(data.error);
      } else {
        setError("비밀번호 변경 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg p-8 rounded-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">비밀번호 재설정</h2>

        {/* 새 비밀번호 */}
        <div>
          <label htmlFor="newPassword" className="block mb-1 text-sm font-medium text-gray-700">
            새 비밀번호
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="새 비밀번호를 입력하세요"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              fieldErrors.newPassword ? "border-red-400" : "border-gray-300"
            }`}
          />
          {fieldErrors.newPassword && (
            <p className="text-sm text-red-500 mt-1">{fieldErrors.newPassword}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              fieldErrors.confirmPassword ? "border-red-400" : "border-gray-300"
            }`}
          />
          {fieldErrors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        {/* 공통 에러 메시지 */}
        {error && <p className="text-center text-sm text-red-600">{error}</p>}

        {/* 성공 메시지 */}
        {message && <p className="text-center text-sm text-green-600">{message}</p>}

        {/* 버튼 */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  );
}
