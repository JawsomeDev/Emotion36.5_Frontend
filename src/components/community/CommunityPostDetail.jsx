import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCommunityPost, likePost, unlikePost } from "../../api/community";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ko";
import { ThumbsUp, MessageCircle } from "lucide-react";
import CommunityDeleteModal from "./CommunityDeleteModal";

// ✅ 플러그인 확장
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale("ko");

const EMOTION_LABELS = {
  JOY: "기쁨",
  SADNESS: "슬픔",
  ANGER: "화남",
  CALM: "평온",
  FEAR: "불안",
  TIRED: "피곤"
};

const EMOJI = {
  JOY: "😊",
  SADNESS: "😢",
  ANGER: "😠",
  CALM: "🙂",
  FEAR: "😨",
  TIRED: "😴"
};

const TEXT_COLOR_MAP = {
  JOY: "text-[#854D0E]",
  SADNESS: "text-[#1E40AF]",
  ANGER: "text-[#991B1B]",
  CALM: "text-[#166534]",
  FEAR: "text-[#6B21A8]",
  TIRED: "text-[#1F2937]"
};

const COLOR_MAP = {
  JOY: "bg-yellow-100 border border-yellow-200",
  SADNESS: "bg-blue-100 border border-blue-200",
  ANGER: "bg-red-100 border border-red-200",
  CALM: "bg-green-100 border border-green-200",
  FEAR: "bg-purple-100 border border-purple-200",
  TIRED: "bg-gray-100 border border-gray-200"
};

const TAG_COLOR_MAP = {
  JOY: "bg-yellow-300 text-yellow-900",
  SADNESS: "bg-blue-300 text-blue-900",
  ANGER: "bg-red-300 text-red-900",
  CALM: "bg-green-300 text-green-900",
  FEAR: "bg-purple-300 text-purple-900",
  TIRED: "bg-gray-300 text-gray-900"
};

export default function CommunityPostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchPost = async () => {
    try {
      const data = await getCommunityPost(postId);
      setPost(data);
    } catch (err) {
      console.error("❌ 게시글 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleLikeToggle = async () => {
    if (!post) return;
    try {
      const newLiked = !post.liked;
      const updatedCount = newLiked
        ? await likePost(postId)
        : await unlikePost(postId);

      setPost((prev) => ({
        ...prev,
        liked: newLiked,
        likeCount: updatedCount.data
      }));
    } catch (err) {
      console.error("좋아요 실패", err);
    }
  };

  const handleEdit = () => {
    navigate(`/communities/${postId}/edit`);
  };

  if (loading) return <div className="text-center">불러오는 중...</div>;
  if (!post) return <div className="text-center text-red-500">게시글을 찾을 수 없습니다.</div>;

  const {
    emotion,
    emotionTags,
    content,
    author,
    createdAt,
    likeCount,
    commentCount,
    isAuthor,
    liked
  } = post;

  return (
    <>
      <div className={`p-6 rounded-lg shadow ${COLOR_MAP[emotion]} overflow-x-auto`}>
        <div className="flex justify-between text-sm">
          <div className={`flex items-center gap-2 font-semibold ${TEXT_COLOR_MAP[emotion]}`}>
            <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full ${COLOR_MAP[emotion]} border`}>
              {EMOJI[emotion]} {EMOTION_LABELS[emotion]}
            </span>
            <span>{author.nickname}</span>
          </div>
          {/* ✅ KST 기준 상대시간 표시 */}
          <span className="text-sm text-gray-500">
            {dayjs(createdAt).tz("Asia/Seoul").fromNow()}
          </span>
        </div>

        <div className={`mt-2 text-[16px] whitespace-pre-line break-words ${TEXT_COLOR_MAP[emotion]}`}>
          {content}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {emotionTags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${TAG_COLOR_MAP[emotion]}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className={`flex justify-start gap-4 items-center mt-4 text-sm ${TEXT_COLOR_MAP[emotion]}`}>
          <button onClick={handleLikeToggle} className="flex items-center gap-1">
            <ThumbsUp className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            {likeCount}
          </button>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {commentCount}
          </div>
        </div>
      </div>

      {isAuthor && (
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition"
          >
            <span className="material-symbols-outlined text-base">수정</span> 
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-red-500 rounded-lg shadow-sm hover:bg-red-600 transition"
          >
            <span className="material-symbols-outlined text-base">삭제</span> 
          </button>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50">
          <CommunityDeleteModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            postId={postId}
          />
        </div>
      )}
    </>
  );
}
