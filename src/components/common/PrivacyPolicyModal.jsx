// src/components/common/PrivacyPolicyModal.jsx
import React from "react";
import Modal from "./Modal";

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center"> 개인정보처리방침</h2>
        <p className="text-sm text-gray-700">
          <strong>내 감정온도 36.5도</strong>는 이용자의 소중한 개인정보를 보호하기 위해 최선을 다하고 있습니다.
        </p>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            서비스 이용 시 이메일, 닉네임 등 최소한의 정보만 수집하며, 외부에 제공하지 않습니다.
          </p>
          <p>
            모든 정보는 회원의 동의 없이 제3자에게 제공되지 않으며, 언제든지 열람 및 삭제를 요청하실 수 있습니다.
          </p>
          <p>
            본 방침은 서비스 개선 또는 법령 변경에 따라 수정될 수 있으며, 변경 사항은 공지사항을 통해 고지됩니다.
          </p>
        </div>

        <div className="text-right text-xs text-gray-500 mt-4">
          (시행일: 2025년 4월 15일)
        </div>
      </div>
    </Modal>
  );
}
