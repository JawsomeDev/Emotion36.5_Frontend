import { useEffect, useState } from "react";
import EmotionContentList from "../components/content/EmotionContentList";
import { fetchLatestRecommendations } from "../api/record";

export default function ContentPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null);     // 에러 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLatestRecommendations();
        setRecommendations(data);
      } catch (err) {
        console.error("❌ 추천 콘텐츠 가져오기 실패", err);
        setError("추천 콘텐츠를 불러오지 못했습니다.");
      } finally {
        setLoading(false); // 무조건 종료 후 로딩 false
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen pt-24">
      {/* 헤더 영역 */}
      <section className="text-center">
        <h2 className="text-3xl font-extrabold">맞춤형 힐링 콘텐츠</h2>
        <p className="text-gray-500 mt-2">당신의 감정에 맞는 콘텐츠를 추천해드립니다</p>
      </section>

      {/* 본문 콘텐츠 영역 */}
      <main className="bg-gray-50 p-6 mt-12 max-w-5xl mx-auto rounded-xl shadow">
        <h3 className="text-2xl font-bold mb-6">🎵 감정 기반 콘텐츠 추천</h3>

        {loading && (
          <p className="text-center text-gray-400">추천 콘텐츠를 불러오는 중...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && !error && (
          <EmotionContentList contents={recommendations} />
        )}
      </main>
    </div>
  );
}
