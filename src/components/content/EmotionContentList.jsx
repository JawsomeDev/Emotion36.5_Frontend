import EmotionRecommendationCard from './EmotionRecommendationCard';

export default function EmotionContentList({ contents }) {
  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">감정에 맞는 힐링 콘텐츠 추천</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {contents.map((item, idx) => (
          <EmotionRecommendationCard key={idx} content={item} />
        ))}
      </div>
    </div>
  );
}
