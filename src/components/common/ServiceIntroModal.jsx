// src/components/common/ServiceIntroModal.jsx
import React from "react";
import Modal from "./Modal";

export default function ServiceIntroModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center"> 내 감정온도 36.5도란?</h2>
        <p className="text-gray-700 text-sm text-center">
          “오늘 하루도 수고했어요. 당신의 감정은 소중합니다.”<br />
          감정의 흐름을 기록하고 돌아보며, 더 나은 나를 위한 작은 습관을 만들어보세요.
        </p>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">🎯 주요 기능</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li>감정 기록하기: 하루 동안 느낀 감정을 간편하게 남길 수 있어요.</li>
            <li>감정 분석 보기: 주간·월간으로 감정 흐름을 시각화합니다.</li>
            <li>커뮤니티 소통: 같은 감정을 느낀 사람들과 소통할 수 있어요.</li>
            <li>콘텐츠 추천: 감정에 맞는 음악, 영상 등을 추천받을 수 있어요.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">💡 이런 분께 추천해요</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li>감정을 되돌아보고 싶은 분</li>
            <li>감정일기를 꾸준히 쓰고 싶은 분</li>
            <li>자신을 이해하고 싶은 분</li>
            <li>공감하며 소통하고 싶은 분</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
