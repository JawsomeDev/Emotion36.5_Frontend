import { Music, Film, Tv } from 'lucide-react';

const categoryIcons = {
  SONG: <Music className="w-6 h-6 text-pink-500" />,
  MOVIE: <Film className="w-6 h-6 text-blue-500" />,
  TV: <Tv className="w-6 h-6 text-green-500" />,
};

export default function EmotionRecommendationCard({ content }) {
  const { title, link, category, emotion, thumbnail } = content;

  return (
    <div className="w-full sm:w-80 rounded-2xl shadow-md bg-white p-4 flex flex-col gap-4 hover:shadow-lg transition-all">
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover rounded-xl" />
      <div className="flex items-center gap-2">
        {categoryIcons[category]}
        <span className="text-sm text-gray-600">{emotion} · {category}</span>
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        보러 가기
      </a>
    </div>
  );
}
