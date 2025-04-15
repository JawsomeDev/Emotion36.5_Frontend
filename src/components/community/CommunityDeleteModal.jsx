// src/components/community/CommunityDeleteModal.jsx
import React from "react";
import Modal from "../common/Modal";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../api/community";
import { toast } from "react-toastify";

export default function CommunityDeleteModal({ isOpen, onClose, postId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      toast.success("게시글이 삭제되었습니다.");
      navigate("/community");
    } catch (err) {
      console.error("삭제 실패", err);
      toast.error("게시글 삭제에 실패했습니다.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">정말 삭제하시겠어요?</h2>
        <p className="text-sm text-gray-600">삭제한 게시글은 되돌릴 수 없습니다.</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            삭제하기
          </button>
        </div>
      </div>
    </Modal>
  );
}