import { Music, Film } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecommendedContentList() {
  const dummyContents = [
    {
      emotion: "평온",
      category: "노래 추천",
      title: "The Lazy Song",
      icon: <Music className="w-4 h-4 text-pink-500" />,
      thumbnail:
        "https://i.ytimg.com/vi/fLexgOxsZu0/hqdefault.jpg", // 유튜브 썸네일 예시
    },
    {
      emotion: "기쁨",
      category: "영화 추천",
      title: "소닉 2",
      icon: <Film className="w-4 h-4 text-blue-500" />,
      thumbnail:
        "https://image.tmdb.org/t/p/w500/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg", // TMDB 포스터 예시
    },
  ];

  return (
    <section className="text-center bg-white p-6 rounded-xl border">
      <h2 className="text-2xl font-bold mb-2">감정에 맞는 힐링 콘텐츠 추천</h2>
      <p className="text-gray-500 mb-8">
        당신의 감정에 맞는 콘텐츠를 추천해드려요
      </p>

      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {dummyContents.map((item, idx) => (
          <div
            key={idx}
            className="w-72 border rounded-2xl p-4 bg-white shadow hover:shadow-lg transition-all"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <div className="flex items-center gap-2 mb-1 text-sm text-gray-600">
              {item.icon}
              {item.emotion} · {item.category}
            </div>
            <h3 className="font-semibold text-base">{item.title}</h3>
          </div>
        ))}
      </div>

      <Link
        to="/content"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
      >
        콘텐츠 추천 받기 →
      </Link>
    </section>
  );
}
