import React, { useState } from "react";
import Modal from "../common/Modal";
import { updateComment } from "../../api/community";

export default function CommentEditModal({ comment, onClose, onUpdate, isOpen }) {
  const [content, setContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateComment(comment.id, content); // ✅ API 호출
      onUpdate(comment.id, content); // 로컬 상태 업데이트
      onClose();
    } catch (err) {
      console.error("댓글 수정 실패", err);
      alert("댓글 수정 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-4">
        <h2 className="text-lg font-semibold">댓글 수정</h2>
        <textarea
          className="w-full border rounded p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-end gap-6">
          <button onClick={onClose} className="text-gray-500">
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="border border-black text-black px-4 py-2 rounded"
          >
            {loading ? "수정 중..." : "저장"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
