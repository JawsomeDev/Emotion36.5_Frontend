import React from "react"

export default function EmotionChart() {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold">이번 주 감정 흐름</h2>
      <p className="text-sm text-gray-500">지난 7일간의 감정 변화를 확인해보세요</p>
      <div className="rounded-md border h-48 flex items-center justify-center">
        <p className="text-gray-400">(감정 차트 자리)</p>
      </div>
    </div>
  )
}