import { useState } from "react";
import { createCommunityPost } from "../api/community";
import { toast } from "react-toastify";

const EMOTIONS = [
  { label: "기쁨", value: "JOY", icon: "😊", color: "bg-yellow-200" },
  { label: "슬픔", value: "SADNESS", icon: "😢", color: "bg-blue-200" },
  { label: "화남", value: "ANGER", icon: "😠", color: "bg-red-200" },
  { label: "평온", value: "CALM", icon: "😌", color: "bg-green-200" },
  { label: "불안", value: "FEAR", icon: "😰", color: "bg-purple-200" },
  { label: "피곤", value: "TIRED", icon: "😴", color: "bg-gray-200" },
];

const EMOTION_TAGS = {
  기쁨: ["행복", "설렘", "만족", "감사", "성취", "즐거움"],
  슬픔: ["우울", "그리움", "상실", "외로움", "허무", "아쉬움"],
  화남: ["분노", "짜증", "실망", "억울함", "답답함", "불만"],
  평온: ["안정", "편안", "여유", "만족", "평화", "안심"],
  불안: ["걱정", "긴장", "두려움", "초조", "스트레스", "혼란"],
  피곤: ["지침", "무기력", "나른함", "권태", "졸림", "에너지부족"]
};

const TAG_COLOR_MAP = {
  JOY: "bg-yellow-300 text-black",
  SADNESS: "bg-blue-300 text-black",
  ANGER: "bg-red-300 text-black",
  CALM: "bg-green-300 text-black",
  FEAR: "bg-purple-300 text-black",
  TIRED: "bg-gray-300 text-black",
};

export default function CommunityForm({ onPostCreated }) {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [emotionValue, setEmotionValue] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [content, setContent] = useState("");

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    // 필드 유효성 검증
    if (!content.trim()) {
      toast.warn("내용을 입력해주세요.");
      return;
    }
    if (!selectedEmotion || !emotionValue) {
      toast.warn("감정을 선택해주세요.");
      return;
    }

    const data = {
      content,
      emotion: emotionValue,
      emotionTags: selectedTags,
    };

    try {
      await createCommunityPost(data);
      toast.success("게시글이 등록되었습니다.");

      // 초기화
      setContent("");
      setSelectedTags([]);
      setSelectedEmotion(null);
      setEmotionValue(null);

      onPostCreated();
    } catch (e) {
      // 백엔드로부터 validation 에러 응답이 왔을 때
      if (e.response?.data?.errors) {
        const fieldErrors = e.response.data.errors;
        for (const key in fieldErrors) {
          toast.error(fieldErrors[key]);
        }
      } else {
        toast.error("게시글 작성에 실패했습니다.");
      }
    }
  };

  const tagOptions = selectedEmotion ? EMOTION_TAGS[selectedEmotion] || [] : [];

  return (
    <div className="bg-white shadow rounded-lg p-10 w-full space-y-6">
      <h2 className="text-2xl font-bold">나의 감정 공유하기</h2>
      <p className="text-sm text-gray-500">당신의 감정을 선택하고 이야기를 나눠보세요</p>

      {/* 감정 선택 */}
      <div>
        <label className="block text-sm font-semibold mb-2">감정 선택</label>
        <div className="grid grid-cols-6 gap-2">
          {EMOTIONS.map((emotion) => (
            <button
              key={emotion.label}
              onClick={() => {
                setSelectedEmotion(emotion.label);
                setEmotionValue(emotion.value);
                setSelectedTags([]);
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-sm
                ${selectedEmotion === emotion.label ? `${emotion.color} ring-2 ring-black/70` : "bg-white"}`}
            >
              <span className="text-xl">{emotion.icon}</span>
              {emotion.label}
            </button>
          ))}
        </div>
      </div>

      {/* 내용 */}
      <div>
        <label className="block text-sm font-semibold mb-2">내용</label>
        <textarea
          rows={4}
          className="w-full border rounded-lg p-3 text-sm"
          placeholder="오늘 어떤 일이 있었나요? 어떤 감정을 느꼈나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* 감정 태그 */}
      {tagOptions.length > 0 && (
        <div>
          <label className="block text-sm font-semibold mb-2">감정 태그 선택</label>
          <div className="flex flex-wrap gap-2">
            {tagOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm border transition
                    ${selectedTags.includes(tag)
                    ? TAG_COLOR_MAP[emotionValue] || "bg-gray-300 text-black"
                    : "bg-white text-gray-600"}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 제출 */}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
        >
          게시하기
        </button>
      </div>
    </div>
  );
}
