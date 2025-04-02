import React from "react"
import { Thermometer } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-center text-sm text-gray-500 py-10 mt-20">
      <div className="flex justify-center items-center gap-2 mb-2 text-black font-bold text-lg">
        <Thermometer className="w-5 h-5" /> 내 감정온도 36.5도
      </div>
      <p className="mb-2">"오늘 하루도 수고했어요. 당신의 감정은 소중합니다."</p>
      <div className="space-x-4 mb-2">
        <a href="#" className="hover:underline">서비스 소개</a>
        <a href="#" className="hover:underline">개인정보처리방침</a>
        <a href="#" className="hover:underline">이용약관</a>
      </div>
      <p className="text-xs">© 2025 내 감정온도 36.5도. All rights reserved.</p>
    </footer>
  )
}
