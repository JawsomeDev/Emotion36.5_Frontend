import React from "react"
import EmotionSelector from "../components/EmotionSelector"
import EmotionChart from "../components/EmotionChart"
import RecommendedContentList from "../components/RecommendedContentList"
import CommunityIntro from "../components/CommunityIntro"


export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">당신의 감정을 기록하고 관리하세요</h1>
        <p className="text-gray-500">
          감정을 기록하고, 분석하고, 맞춤형 힐링 콘텐츠를 추천받는 서비스
        </p>
      </div>
      <EmotionSelector />
      <EmotionChart />
      <RecommendedContentList />
      <CommunityIntro />
    </div>
  )
}