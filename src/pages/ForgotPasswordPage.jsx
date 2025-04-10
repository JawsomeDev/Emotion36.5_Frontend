import ForgotPasswordForm from "../components/ForgotPasswordForm"

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">비밀번호 재설정</h1>
      <ForgotPasswordForm />
    </div>
  )
}
