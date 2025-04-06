import React, { useState, useEffect } from "react";

export default function EmotionEditForm({ record, onSubmit }) {
  const [activeTab, setActiveTab] = useState("emotion"); // 기본적으로 '감정' 탭을 보여줌
  const [form, setForm] = useState({
    emotion: record.emotion,
    diary: record.diary,
    reason: record.reason,
    situation: record.situation,
    relatedPerson: record.relatedPerson,
    reliefAttempt: record.reliefAttempt,
    reliefFailedReason: record.reliefFailedReason,
    reliefSucceeded: record.reliefSucceeded,
    prevention: record.prevention,
    emotionTags: record.emotionTags,
  });

  const [tags, setTags] = useState([]); // 감정 선택 후 해당하는 태그들

  // 감정 선택 시 관련 태그 설정
  useEffect(() => {
    const emotionTags = {
      JOY: ["행복", "설렘", "만족", "감사", "성취", "즐거움"],
      SADNESS: ["우울", "그리움", "상실", "외로움", "허무", "아쉬움"],
      ANGER: ["분노", "짜증", "실망", "억울함", "답답함", "불만"],
      CALM: ["안정", "편안", '여유', "평화", "안심"],
      FEAR: ["걱정", "긴장", "두려움", "초조", "스트레스", "혼란"],
      TIRED: ["지침", "무기력", "나른함", "권태", "졸림", "에너지부족"],
    };
    setTags(emotionTags[form.emotion] || []);
  }, [form.emotion]);

  // Input 값 변경 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 감정 변경 핸들러
  const handleEmotionChange = (e) => {
    setForm({ ...form, emotion: e.target.value });
  };

  // 태그 선택 핸들러 (버튼 클릭 시 선택 / 해제)
  const handleTagSelect = (tag) => {
    const updatedTags = form.emotionTags.includes(tag)
      ? form.emotionTags.filter((t) => t !== tag)
      : [...form.emotionTags, tag];
    setForm({ ...form, emotionTags: updatedTags });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      {/* Tab Navigation */}
      <div className="flex mb-4">
        <button
          type="button"
          onClick={() => setActiveTab("emotion")}
          className={`px-4 py-2 w-1/3 ${activeTab === "emotion" ? "bg-gray-100 text-black" : "bg-white text-black"}`}
        >
          감정
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("diary")}
          className={`px-4 py-2 w-1/3 ${activeTab === "diary" ? "bg-gray-100 text-black" : "bg-white text-black"}`}
        >
          감정일기
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("details")}
          className={`px-4 py-2 w-1/3 ${activeTab === "details" ? "bg-gray-100 text-black" : "bg-white text-black"}`}
        >
          세부정보
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "emotion" && (
        <div>
          <label className="block mb-1 font-medium">감정</label>
          <select
            name="emotion"
            value={form.emotion}
            onChange={handleEmotionChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="JOY">😊 기쁨</option>
            <option value="SADNESS">😢 슬픔</option>
            <option value="ANGER">😠 화남</option>
            <option value="CALM">😌 평온</option>
            <option value="FEAR">😰 불안</option>
            <option value="TIRED">😴 피곤</option>
          </select>

          {/* 감정 태그 선택 UI (버튼 형식으로 복수 선택 가능) */}
          <label className="block mt-2 mb-1 font-medium">감정 태그</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagSelect(tag)}
                className={`px-4 py-2 border rounded-full text-sm ${
                  form.emotionTags.includes(tag)
                    ? "bg-yellow-200 text-blue-800"
                    : "bg-white text-black"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "diary" && (
        <div>
          <label className="block mb-1 font-medium">감정일기</label>
          <textarea
            name="diary"
            value={form.diary}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="3"
          />
        </div>
      )}

      {activeTab === "details" && (
        <div>
          <label className="block mb-1 font-medium">이유</label>
          <input
            name="reason"
            value={form.reason}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mb-1 font-medium">상황</label>
          <input
            name="situation"
            value={form.situation}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mb-1 font-medium">관련 인물</label>
          <input
            name="relatedPerson"
            value={form.relatedPerson}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mb-1 font-medium">해소 방법</label>
          <input
            name="reliefAttempt"
            value={form.reliefAttempt}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mb-1 font-medium">해소 실패 이유</label>
          <input
            name="reliefFailedReason"
            value={form.reliefFailedReason}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mb-1 font-medium">효과 있었던 방법</label>
          <input
            name="reliefSucceeded"
            value={form.reliefSucceeded}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mb-1 font-medium">예방 방법</label>
          <input
            name="prevention"
            value={form.prevention}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      )}

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        저장하기
      </button>
    </form>
  );
}
