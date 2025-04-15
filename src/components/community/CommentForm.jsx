import React, { useState } from "react";
import { createComment } from "../../api/community";
import { toast } from "react-toastify";

export default function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await createComment({ communityId: postId, content });
      toast.success("댓글이 작성되었습니다.");
      setContent(""); // 폼 초기화
      onCommentAdded(); // 리스트 새로고침 트리거
    } catch (err) {
      console.error("❌ 댓글 작성 실패", err);
      toast.error("댓글 작성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring"
        rows={3}
      />
      <div className="text-right">
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "작성 중..." : "댓글 작성"}
        </button>
      </div>
    </form>
  );
}