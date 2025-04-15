// CommunityList.jsx - 최종 수정본
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";
import {
  likePost,
  unlikePost,
  isLikedPost,
  getCommentCount,
  fetchCommunityList,
} from "../../api/community";
import PageComponent from "../common/PageComponent";
import { toast } from "react-toastify";

const getNum = (v, d) => isNaN(parseInt(v)) ? d : parseInt(v);

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
  JOY: "기쁨", SADNESS: "슬픔", ANGER: "화남", CALM: "평온", FEAR: "불안", TIRED: "피곤"
};

const EMOJI = {
  JOY: "😊", SADNESS: "😢", ANGER: "😠", CALM: "🙂", FEAR: "😨", TIRED: "😴"
};

export default function CommunityList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const page = getNum(params.get("page"), 1);
  const emotionType = params.get("emotionType");
  const [justPosted, setJustPosted] = useState(false);

  const [serverData, setServerData] = useState({
    currentPage: 1,
    prev: false,
    next: false,
    prevPage: null,
    nextPage: null,
    pageNumList: [],
    content: [],
  });

  const [likedMap, setLikedMap] = useState({});

  const movePage = ({ page }) => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", page);
    setParams(newParams);
  };

  const handleFilterClick = (value) => {
    const newParams = new URLSearchParams(params);
    if (!value) newParams.delete("emotionType");
    else newParams.set("emotionType", value);
    newParams.set("page", 1);
    setParams(newParams);
  };

  // 🔄 새 게시글 작성 후 상태 감지
  useEffect(() => {
    if (location.state?.justPosted) {
      setJustPosted(true);
      if (location.state.toast) toast.success(location.state.toast);
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchCommunityList({ page, emotionType });
        setServerData(result);

        const newLiked = {};
        await Promise.all(
          result.content.map(async (post) => {
            try {
              const [liked] = await Promise.all([
                isLikedPost(post.id),
                getCommentCount(post.id),
              ]);
              newLiked[post.id] = liked.data;
            } catch {
              newLiked[post.id] = false;
            }
          })
        );
        setLikedMap(newLiked);
      } catch (err) {
        console.error("불러오기 실패", err);
      }
    };

    loadData();
    if (justPosted) setJustPosted(false); // 🔁 상태 리셋
  }, [page, emotionType, justPosted]);

  const handleLikeToggle = async (postId) => {
    const isLiked = likedMap[postId];
    try {
      if (isLiked) await unlikePost(postId);
      else await likePost(postId);
      setLikedMap((prev) => ({ ...prev, [postId]: !isLiked }));
      setServerData((prev) => ({
        ...prev,
        content: prev.content.map((p) =>
          p.id === postId
            ? { ...p, likeCount: Math.max(0, p.likeCount + (isLiked ? -1 : 1)) }
            : p
        ),
      }));
    } catch (err) {
      console.error("좋아요 실패", err);
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

      {/* 게시글 */}
      {serverData.content.length === 0 ? (
        <p className="text-center text-gray-500">해당 감정의 게시글이 없습니다.</p>
      ) : (
        serverData.content.map((post) => (
          <div key={post.id} className={`p-6 rounded-lg shadow ${COLOR_MAP[post.emotion]}`}>
            <div className="flex justify-between text-sm">
              <div className={`flex items-center gap-2 font-semibold ${TEXT_COLOR_MAP[post.emotion]}`}>
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full ${COLOR_MAP[post.emotion]} border`}>
                  {EMOJI[post.emotion]} {EMOTION_LABELS[post.emotion]}
                </span>
                <span>{post.author?.nickname}</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>

            <div className={`mt-2 text-[16px] whitespace-pre-line line-clamp-1 ${TEXT_COLOR_MAP[post.emotion]}`}>
              {post.content}
            </div>

            <div className={`flex justify-between items-center mt-4 text-sm ${TEXT_COLOR_MAP[post.emotion]}`}>
              <div className="flex items-center gap-4">
                <button onClick={() => handleLikeToggle(post.id)} className="flex items-center gap-1">
                  <ThumbsUp className={`w-4 h-4 ${likedMap[post.id] ? "fill-current" : ""}`} />
                  {post.likeCount}
                </button>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {post.commentCount}
                </div>
              </div>
              <button onClick={() => navigate(`/communities/${post.id}`)} className="hover:underline">
                자세히 보기
              </button>
            </div>
          </div>
        ))
      )}
      <PageComponent serverData={serverData} movePage={movePage} />
    </div>
  );
}