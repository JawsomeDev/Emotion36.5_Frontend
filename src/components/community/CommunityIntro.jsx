import React from "react"
import { Link } from "react-router-dom"

export default function CommunityIntro() {
  return (
    <div className="bg-gray-50 rounded-xl text-center py-10 px-6 mt-10">
      <h2 className="text-2xl font-bold mb-2">감정 공유 커뮤니티</h2>
      <p className="text-gray-500 mb-6">
        비슷한 감정을 가진 사람들과 소통하고 공감대를 형성해보세요
      </p>
      <Link
        to="/community"
        className="inline-block bg-gray-900 text-white font-semibold px-6 py-3 rounded hover:bg-gray-800 transition"
      >
        공감 커뮤니티로 가기 →
      </Link>
    </div>
  )
}