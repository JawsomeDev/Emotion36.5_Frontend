import { useState } from "react"
import axios from "axios"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")

    try {
     const res =  await axios.post("/api/password/request-reset", null, {
        params: { email },
      })
      setMessage(res.data)
    } catch (err) {
        const errMsg = err.response?.data?.error || "알 수 없는 오류입니다.";
        setError(errMsg); 
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        가입한 이메일
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
        비밀번호 재설정 링크 받기
      </button>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
