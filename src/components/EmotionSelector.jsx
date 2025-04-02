import React from "react"
import { useNavigate } from "react-router-dom"

const emotions = [
  { emoji: "😊", label: "기쁨", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { emoji: "😢", label: "슬픔", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { emoji: "😠", label: "화남", color: "bg-red-100 text-red-800 border-red-200" },
  { emoji: "😌", label: "평온", color: "bg-green-100 text-green-800 border-green-200" },
  { emoji: "😰", label: "불안", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { emoji: "😴", label: "피곤", color: "bg-gray-100 text-gray-800 border-gray-200" },
]

export default function EmotionSelector() {
  const navigate = useNavigate()
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl border rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">오늘의 감정은 어떤가요?</h2>
        <p className="text-sm text-gray-500 mb-4">감정을 선택하고 기록해보세요</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {emotions.map((emotion) => (
            <div
              key={emotion.label}
              className={`rounded-md border text-center py-4 text-sm font-medium ${emotion.color}`}
            >
              <div className="text-xl">{emotion.emoji}</div>
              {emotion.label}
            </div>
          ))}
        </div>
        <div className="text-right mt-4">
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={() => navigate("/record")}
          >
            감정 기록하러 가기 →
          </button>
        </div>
      </div>
    </div>
  )
}
