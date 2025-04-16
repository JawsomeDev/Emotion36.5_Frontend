// src/components/common/TermsOfServiceModal.jsx
import React from "react";
import Modal from "./Modal";

export default function TermsOfServiceModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center"> 이용약관</h2>
        <p className="text-sm text-gray-700">
          <strong>내 감정온도 36.5도</strong> 서비스를 이용해 주셔서 감사합니다.
        </p>

        <ul className="list-disc text-sm text-gray-700 pl-5 space-y-1">
          <li>이 서비스는 감정 기록 및 공유를 목적으로 합니다.</li>
          <li>욕설, 혐오, 광고성 글은 사전 경고 없이 삭제될 수 있습니다.</li>
          <li>이용자는 언제든지 본인의 게시글을 수정하거나 삭제할 수 있습니다.</li>
          <li>서비스 이용과 관련한 모든 책임은 사용자에게 있습니다.</li>
        </ul>

        <div className="text-sm text-gray-500 mt-4">
          본 약관은 2025년 4월 15일부터 적용됩니다.
        </div>
      </div>
    </Modal>
  );
}
