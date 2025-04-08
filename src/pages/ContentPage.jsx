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
    <main className="min-h-screen bg-gray-50 p-10 pt-24 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🎵 감정 기반 콘텐츠 추천</h2>

      {loading && <p className="text-center text-gray-400">추천 콘텐츠를 불러오는 중...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && <EmotionContentList contents={recommendations} />}
    </main>
  );
}
