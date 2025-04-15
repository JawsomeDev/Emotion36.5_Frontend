import React, { useEffect, useState } from "react";
import {
  getCommentsByPostId,
  isLikedComment,
  likeComment,
  unlikeComment,
} from "../../api/community";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ThumbsUp } from "lucide-react";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const INITIAL_COUNT = 5;

export default function CommentList({ postId, triggerRefresh }) {
  const [comments, setComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [likedMap, setLikedMap] = useState({});
  const [loading, setLoading] = useState(true);

  const loadComments = async () => {
    try {
      const res = await getCommentsByPostId(postId);
      setComments(res);

      const likedState = {};
      await Promise.all(
        res.map(async (comment) => {
          try {
            const likedRes = await isLikedComment(comment.id);
            likedState[comment.id] = likedRes.data;
          } catch {
            likedState[comment.id] = false;
          }
        })
      );
      setLikedMap(likedState);
    } catch (err) {
      console.error("❌ 댓글 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeToggle = async (commentId) => {
    const isLiked = likedMap[commentId];
    try {
      const res = isLiked
        ? await unlikeComment(commentId)
        : await likeComment(commentId);
      setLikedMap((prev) => ({ ...prev, [commentId]: !isLiked }));
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, likeCount: res.data } : c
        )
      );
    } catch (err) {
      console.error("❌ 댓글 좋아요 실패", err);
    }
  };

  useEffect(() => {
    loadComments();
    setVisibleCount(INITIAL_COUNT); // refresh 시 초기화
  }, [postId, triggerRefresh]);

  if (loading) return <div className="text-center mt-4">댓글을 불러오는 중...</div>;
  if (comments.length === 0)
    return <div className="text-center mt-4 text-gray-500">아직 댓글이 없습니다.</div>;

  const visibleComments = comments.slice(0, visibleCount);
  const hasMore = visibleCount < comments.length;

  return (
    <div className="mt-6 space-y-4">
      {visibleComments.map((comment) => (
        <div key={comment.id} className="border rounded-md p-4 bg-white shadow-sm">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span className="font-semibold">{comment.authorNickname || "알 수 없음"}</span>
            <span>{dayjs(comment.createdAt).fromNow()}</span>
          </div>
          <div className="text-gray-800 text-base whitespace-pre-line">{comment.content}</div>
          <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <button
              onClick={() => handleLikeToggle(comment.id)}
              className="flex items-center gap-1 hover:text-black transition"
            >
              <ThumbsUp
                className={`w-4 h-4 ${likedMap[comment.id] ? "fill-current text-black" : ""}`}
              />
              {comment.likeCount ?? 0}
            </button>
          </div>
        </div>
      ))}

      {hasMore && (
        <div className="text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + INITIAL_COUNT)}
            className="mx-auto block text-sm font-medium text-gray-700 bg-white border border-gray-300
             rounded-full px-6 py-2 hover:bg-gray-100 transition-shadow shadow-sm hover:shadow-md "
          >
            댓글 더 보기
          </button>
        </div>
      )}
    </div>
  );
}
