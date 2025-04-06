import React from "react";

export default function DeleteConfirmForm({ onConfirm, onCancel }) {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold text-center">정말 삭제하시겠습니까?</h2>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          취소
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
