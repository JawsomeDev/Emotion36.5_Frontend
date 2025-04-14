import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";
import {
  likePost,
  unlikePost,
  isLikedPost,
  getCommentCount,
} from "../api/community";

const EMOTION_FILTERS = [
  { label: "전체", value: null },
  { label: "기쁨", value: "JOY" },
  { label: "슬픔", value: "SADNESS" },
  { label: "화남", value: "ANGER" },
  { label: "평온", value: "CALM" },
  { label: "불안", value: "FEAR" },
  { label: "피곤", value: "TIRED" },
];

const TEXT_COLOR_MAP = {
  JOY: "text-[#854D0E]",
  SADNESS: "text-[#1E40AF]",
  ANGER: "text-[#991B1B]",
  CALM: "text-[#166534]",
  FEAR: "text-[#6B21A8]",
  TIRED: "text-[#1F2937]",
};

const COLOR_MAP = {
  JOY: "bg-yellow-100 border border-yellow-200",
  SADNESS: "bg-blue-100 border border-blue-200",
  ANGER: "bg-red-100 border border-red-200",
  CALM: "bg-green-100 border border-green-200",
  FEAR: "bg-purple-100 border border-purple-200",
  TIRED: "bg-gray-100 border border-gray-200",
};

const EMOTION_LABELS = {
  JOY: "기쁨",
  SADNESS: "슬픔",
  ANGER: "화남",
  CALM: "평온",
  FEAR: "불안",
  TIRED: "피곤",
};

const EMOJI = {
  JOY: "😊",
  SADNESS: "😢",
  ANGER: "😠",
  CALM: "🙂",
  FEAR: "😨",
  TIRED: "😴",
};

export default function CommunityList({ posts }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const emotionType = searchParams.get("emotionType");

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [likedMap, setLikedMap] = useState({});
  const [commentCountMap, setCommentCountMap] = useState({});

  useEffect(() => {
    const loadMeta = async () => {
      const newLikedMap = {};
      const newCommentMap = {};
  
      await Promise.all(
        posts.map(async (post) => {
          try {
            const [likedRes, commentRes] = await Promise.all([
              isLikedPost(post.id),        // boolean
              getCommentCount(post.id),    // number
            ]);
            newLikedMap[post.id] = likedRes.data;
            newCommentMap[post.id] = commentRes.data;
          } catch (err) {
            console.log(err.data);
            newLikedMap[post.id] = false;
            newCommentMap[post.id] = 0;
          }
        })
      );
  
      setLikedMap(newLikedMap);
      setCommentCountMap(newCommentMap);
  
      setFilteredPosts(
        emotionType ? posts.filter((p) => p.emotion === emotionType) : posts
      );
    };
  
    loadMeta();
  }, [posts, emotionType]);
  

  // 필터 클릭 시 URL 쿼리 변경
  const handleFilterClick = (value) => {
    if (value === emotionType || !value) {
      searchParams.delete("emotionType");
    } else {
      searchParams.set("emotionType", value);
    }
    setSearchParams(searchParams);
  };

  // 좋아요 토글 핸들링
  const handleLikeToggle = async (postId) => {
    const isLiked = likedMap[postId];
    try {
      if (isLiked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }

      setLikedMap((prev) => ({ ...prev, [postId]: !isLiked }));

      setFilteredPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                likeCount: Math.max(0, post.likeCount + (isLiked ? -1 : 1)),
              }
            : post
        )
      );
    } catch (err) {
      console.error("좋아요 토글 실패", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* 감정 필터 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {EMOTION_FILTERS.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => handleFilterClick(value)}
            className={`px-4 py-1 rounded-full border text-sm font-medium transition ${
              emotionType === value || (!emotionType && value === null)
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 게시글 목록 */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500">해당 감정의 게시글이 없습니다.</p>
      ) : (
        filteredPosts.map((post) => (
          <div
            key={post.id}
            className={`p-6 rounded-lg shadow ${COLOR_MAP[post.emotion]} transition`}
          >
            {/* 상단 */}
            <div className="flex justify-between text-sm">
              <div
                className={`flex items-center gap-2 font-semibold ${TEXT_COLOR_MAP[post.emotion]}`}
              >
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full 
                    ${TEXT_COLOR_MAP[post.emotion]} 
                    ${COLOR_MAP[post.emotion]} border`}
                >
                  {EMOJI[post.emotion]} {EMOTION_LABELS[post.emotion]}
                </span>
                <span>{post.author?.nickname}</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>

            {/* 본문 */}
            <div
              className={`mt-2 text-[16px] whitespace-pre-line line-clamp-2 ${TEXT_COLOR_MAP[post.emotion]}`}
            >
              {post.content}
            </div>

            {/* 하단 */}
            <div
              className={`flex justify-between items-center mt-4 text-sm ${TEXT_COLOR_MAP[post.emotion]}`}
            >
              <div className="flex items-center gap-4">
                {/* 좋아요 */}
                <button
                  onClick={() => handleLikeToggle(post.id)}
                  className="flex items-center gap-1"
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${
                      likedMap[post.id] ? "fill-current" : ""
                    }`}
                  />
                  {post.likeCount}
                </button>

                {/* 댓글 수 */}
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {commentCountMap[post.id] || 0}
                </div>
              </div>

              <button
                onClick={() => navigate(`/communities/${post.id}`)}
                className="hover:underline"
              >
                자세히 보기
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
