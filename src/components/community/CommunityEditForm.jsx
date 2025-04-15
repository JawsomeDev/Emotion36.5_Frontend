// src/components/community/CommunityEditForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCommunityPost, updatePost } from "../../api/community";
import { toast } from "react-toastify";

const EMOTION_OPTIONS = [
  { label: "기쁨", value: "JOY", emoji: "😊", color: "bg-yellow-200", tagColor: "bg-yellow-300 text-black" },
  { label: "슬픔", value: "SADNESS", emoji: "🥲", color: "bg-blue-200", tagColor: "bg-blue-300 text-black" },
  { label: "화남", value: "ANGER", emoji: "😠", color: "bg-red-200", tagColor: "bg-red-300 text-black" },
  { label: "평온", value: "CALM", emoji: "😌", color: "bg-green-200", tagColor: "bg-green-300 text-black" },
  { label: "불안", value: "FEAR", emoji: "😰", color: "bg-purple-200", tagColor: "bg-purple-300 text-black" },
  { label: "피곤", value: "TIRED", emoji: "😴", color: "bg-gray-200", tagColor: "bg-gray-300 text-black" },
];

const EMOTION_TAGS = {
  JOY: ["행복", "설렘", "만족", "감사", "성취", "즐거움"],
  SADNESS: ["우울", "그리움", "상실", "외로움", "허무", "아쉬움"],
  ANGER: ["분노", "짜증", "실망", "억울함", "답답함", "불만"],
  CALM: ["안정", "편안", "여유", "평화", "안심"],
  FEAR: ["걱정", "긴장", "두려움", "초조", "스트레스", "혼란"],
  TIRED: ["지침", "무기력", "나른함", "권태", "졸림", "에너지부족"],
};

export default function CommunityEditForm() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    content: "",
    emotion: "JOY",
    emotionTags: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getCommunityPost(postId);
        setForm({
          content: data.content,
          emotion: data.emotion,
          emotionTags: data.emotionTags || [],
        });
      } catch (err) {
        console.error("불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleTag = (tag) => {
    setForm((prev) => {
      const tags = prev.emotionTags.includes(tag)
        ? prev.emotionTags.filter((t) => t !== tag)
        : [...prev.emotionTags, tag];
      return { ...prev, emotionTags: tags };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(postId, form);
      toast.success("게시글이 수정되었습니다.");
      navigate(`/communities/${postId}`);
    } catch (err) {
      console.error("수정 실패", err);
      toast.error("게시글 수정에 실패했습니다.");
    }
  };

  if (loading) return <div className="text-center">불러오는 중...</div>;

  const selectedEmotionOption = EMOTION_OPTIONS.find(e => e.value === form.emotion);

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg px-6 py-10 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">나의 감정 공유하기</h2>
      <p className="text-sm text-gray-500">당신의 감정을 선택하고 이야기를 나눠보세요</p>

      {/* 감정 선택 */}
      <div>
        <label className="block text-sm font-semibold mb-2">감정 선택</label>
        <div className="grid grid-cols-6 gap-2">
          {EMOTION_OPTIONS.map((emotion) => (
            <button
              key={emotion.label}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, emotion: emotion.value, emotionTags: [] }))}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-sm font-medium transition ${
                form.emotion === emotion.value ? `${emotion.color} ring-2 ring-black/70` : "bg-white hover:bg-gray-50"
              }`}
            >
              <span className="text-xl">{emotion.emoji}</span>
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
          name="content"
          value={form.content}
          onChange={handleChange}
        />
      </div>

      {/* 감정 태그 */}
      <div>
        <label className="block text-sm font-semibold mb-2">감정 태그 선택</label>
        <div className="flex flex-wrap gap-2">
          {(EMOTION_TAGS[form.emotion] || []).map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm border ${
                form.emotionTags.includes(tag)
                  ? `${selectedEmotionOption?.tagColor || "bg-black text-white"}`
                  : "bg-white text-gray-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 제출 */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
        >
          수정하기
        </button>
      </div>
    </form>
  );
}
