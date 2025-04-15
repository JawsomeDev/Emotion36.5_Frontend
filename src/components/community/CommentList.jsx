// src/components/community/CommentList.jsx
import React, { useEffect, useState } from "react";
import { getCommentsByPostId } from "../../api/community";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadComments();
  }, [postId]);

  if (loading) return <div className="text-center mt-4">댓글을 불러오는 중...</div>;
  if (comments.length === 0) return <div className="text-center mt-4 text-gray-500">아직 댓글이 없습니다.</div>;

  return (
    <div className="mt-6 space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="border rounded-md p-4 bg-white shadow-sm">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span className="font-semibold">{comment.nickname}</span>
            <span>{dayjs(comment.createdAt).fromNow()}</span>
          </div>
          <div className="text-gray-800 text-base whitespace-pre-line">{comment.content}</div>
          <div className="text-sm text-gray-500 mt-2 flex items-center gap-1">
            👍 {comment.likeCount}
          </div>
        </div>
      ))}
    </div>
  );
}
