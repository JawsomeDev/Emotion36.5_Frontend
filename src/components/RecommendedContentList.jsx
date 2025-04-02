import React from "react"

const recommendedContents = [
  {
    emotion: "불안",
    title: "5분 명상으로 마음의 평화 찾기",
    url: "https://youtube.com",
  },
  {
    emotion: "슬픔",
    title: "힐링 피아노 음악 - 스트레스 해소에 좋은 음악",
    url: "https://youtube.com",
  },
  {
    emotion: "기쁨",
    title: "긍정적인 마인드셋을 위한 아침 루틴",
    url: "https://youtube.com",
  },
]

export default function RecommendedContentList() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">감정에 맞는 힐링 콘텐츠 추천</h2>
      <p className="text-center text-sm text-gray-500">
        당신의 감정에 맞는 유튜브 영상을 추천해드려요
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {recommendedContents.map((item, idx) => (
          <div key={idx} className="border rounded-lg p-4 space-y-2">
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full inline-block">{item.emotion}</span>
            <h3 className="font-medium text-sm">{item.title}</h3>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full border border-gray-300 text-center py-1 rounded text-sm hover:bg-gray-100"
            >
              유튜브에서 보기
            </a>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button className="text-sm text-gray-500 hover:underline">더 많은 콘텐츠 보기</button>
      </div>
    </div>
  )
}
