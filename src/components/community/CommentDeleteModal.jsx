import React from "react";
import Modal from "../common/Modal";
import { deleteComment } from "../../api/community";

export default function CommentDeleteModal({ commentId, onClose, onDelete, isOpen }) {
  const handleDelete = async () => {
    try {
      await deleteComment(commentId);
      onDelete(commentId);
      onClose();
    } catch (err) {
      console.error("댓글 삭제 실패", err);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-4">
        <h2 className="text-lg font-semibold">댓글을 삭제하시겠습니까?</h2>
        <p className="text-sm text-gray-500">삭제한 댓글은 복구할 수 없습니다.</p>
        <div className="flex justify-end gap-6"> {/* 간격 넓힘 */}
          <button className="text-gray-500" onClick={onClose}>취소</button>
          <button
            className="text-white bg-red-500 px-4 py-2 rounded"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      </div>
    </Modal>
  );
}
