import React, { useEffect, useState } from "react";
import {
  getCommentsByPostId,
  likeComment,
  unlikeComment,
} from "../../api/community";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  MoreHorizontal,
  ThumbsUp,
  Pencil,
  Trash2,
} from "lucide-react";
import "dayjs/locale/ko";
import CommentEditModal from "./CommentEditModal";
import CommentDeleteModal from "./CommentDeleteModal";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const INITIAL_COUNT = 5;

export default function CommentList({ postId, triggerRefresh }) {
  const [comments, setComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  const loadComments = async () => {
    try {
      const res = await getCommentsByPostId(postId);
      setComments(res);
    } catch (err) {
      console.error("❌ 댓글 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeToggle = async (commentId) => {
    try {
      const comment = comments.find((c) => c.id === commentId);
      const res = comment.liked
        ? await unlikeComment(commentId)
        : await likeComment(commentId);

      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? { ...c, liked: !c.isLiked, likeCount: res.data }
            : c
        )
      );
    } catch (err) {
      console.error("❌ 댓글 좋아요 실패", err);
    }
  };

  const handleUpdate = (id, newContent) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, content: newContent } : c))
    );
  };

  const handleDelete = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  useEffect(() => {
    loadComments();
    setVisibleCount(INITIAL_COUNT);
  }, [postId, triggerRefresh]);

  if (loading) return <div className="text-center mt-4">댓글을 불러오는 중...</div>;
  if (comments.length === 0)
    return <div className="text-center mt-4 text-gray-500">아직 댓글이 없습니다.</div>;

  const visibleComments = comments.slice(0, visibleCount);
  const hasMore = visibleCount < comments.length;

  return (
    <div className="mt-6 space-y-4">
      {visibleComments.map((comment) => (
        <div
          key={comment.id}
          className="border rounded-md p-4 bg-white shadow-sm relative"
        >
          <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{comment.authorNickname || "알 수 없음"}</span>
              <span className="text-gray-400 text-xs">
                {dayjs(comment.createdAt).fromNow()}
              </span>
            </div>

            {/* ✅ 작성자인 경우에만 메뉴 아이콘 및 메뉴 표시 */}
            {comment.author && (
              <div className="relative">
                <button
                  onClick={() =>
                    setActiveMenuId(activeMenuId === comment.id ? null : comment.id)
                  }
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {activeMenuId === comment.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md z-10">
                    <button
                      onClick={() => {
                        setEditingComment(comment);
                        setActiveMenuId(null);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 w-full"
                    >
                      <Pencil className="w-4 h-4" />
                      수정하기
                    </button>
                    <button
                      onClick={() => {
                        setDeletingCommentId(comment.id);
                        setActiveMenuId(null);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full"
                    >
                      <Trash2 className="w-4 h-4" />
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-gray-800 text-base whitespace-pre-line">
            {comment.content}
          </div>

          <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <button
              onClick={() => handleLikeToggle(comment.id)}
              className="flex items-center gap-1 hover:text-black transition"
            >
              <ThumbsUp
                className={`w-4 h-4 ${comment.liked ? "fill-current text-black" : ""}`}
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

      {/* 수정 모달 */}
      {editingComment && (
        <CommentEditModal
          comment={editingComment}
          isOpen={true}
          onClose={() => setEditingComment(null)}
          onUpdate={handleUpdate}
        />
      )}

      {/* 삭제 모달 */}
      {deletingCommentId && (
        <CommentDeleteModal
          commentId={deletingCommentId}
          isOpen={true}
          onClose={() => setDeletingCommentId(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
