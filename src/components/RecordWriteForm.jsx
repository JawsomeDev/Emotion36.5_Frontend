// RecordWriteForm.jsx
import React, { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { CalendarIcon } from "@radix-ui/react-icons"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { createEmotionRecord } from "../api/record.js"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "./context/AuthContext.jsx"

const EMOTIONS = [
    { label: "기쁨", icon: "😊", color: "bg-yellow-200" },
    { label: "슬픔", icon: "😢", color: "bg-blue-200" },
    { label: "화남", icon: "😠", color: "bg-red-200" },
    { label: "평온", icon: "😌", color: "bg-green-200" },
    { label: "불안", icon: "😰", color: "bg-purple-200" },
    { label: "피곤", icon: "😴", color: "bg-gray-200" },
]

const EMOTION_MAP = {
    "기쁨": "JOY",
    "슬픔": "SADNESS",
    "화남": "ANGER",
    "평온": "CALM",
    "불안": "FEAR",
    "피곤": "TIRED"
  }

const EMOTION_TAGS = {
  기쁨: ["행복", "설렘", "만족", "감사", "성취", "즐거움"],
  슬픔: ["우울", "그리움", "상실", "외로움", "허무", "아쉬움"],
  화남: ["분노", "짜증", "실망", "억울함", "답답함", "불만"],
  평온: ["안정", "편안", "여유", "만족", "평화", "안심"],
  불안: ["걱정", "긴장", "두려움", "초조", "스트레스", "혼란"],
  피곤: ["지침", "무기력", "나른함", "권태", "졸림", "에너지부족"]
}

export default function RecordWriteForm() {
    const {id} = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const getToday = () => new Date()
    const [selectedEmotion, setSelectedEmotion] = useState(null)
    const [diary, setDiary] = useState("")
    const [selectedTags, setSelectedTags] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [date, setDate] = useState(getToday())
    const [details, setDetails] = useState({
        why: "",
        situation: "",
        who: "",
        howToHeal: "",
        notWork: "",
        worked: "",
        prevent: ""
    })

    const handleTagToggle = (tag) => {
        setSelectedTags(prev =>
        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
            )
        }

    const handleSubmit = async () => {

      

    const today = new Date()
    const selected = new Date(date)
    selected.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)
    
    if (selected > today) {
        toast.error("미래 날짜는 선택할 수 없습니다.")
        return
    }
    
    if (!selectedEmotion) {
        toast.warn("감정을 선택해주세요.")
        return
    }
    
    if (!diary.trim()) {
        toast.warn("감정 일기를 작성해주세요.")
        return
    }

    const data = {
        emotion: EMOTION_MAP[selectedEmotion],
        recordDate: date.toISOString().split("T")[0],
        diary,
        emotionTags: selectedTags,
        detailed: showDetails,
        reason: details.why,
        situation: details.situation,
        relatedPerson: details.who,
        reliefAttempt: details.howToHeal,
        reliefFailedReason: details.notWork,
        reliefSucceeded: details.worked,
        prevention: details.prevent
    }
        try {
            await createEmotionRecord(data)
            navigate(`/record/list/${user.id}`)
            toast.success("감정 기록이 저장되었습니다.")
        } catch {
            toast.error("등록에 실패하였습니다.")
        }
    }


    const availableTags = selectedEmotion ? EMOTION_TAGS[selectedEmotion] || [] : []

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold mb-2">오늘의 감정 기록하기</h2>
        <p className="text-sm text-gray-500 mb-6">당신의 감정을 선택하고 간단한 일기를 작성해보세요</p>

        <div className="mb-6">
            <label className=" font-semibold mb-2 block">날짜 선택</label>
            <div className="relative">
            <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                locale={ko}
                dateFormat="yyyy년 MM월 dd일"
                customInput={
                <button className="flex items-center gap-2 border px-4 py-3 rounded-lg w-full text-sm">
                    <CalendarIcon className="w-4 h-4" />
                    {format(date, "yyyy년 M월 d일", { locale: ko })}
                </button>
                }
            />
            </div>
        </div>

        <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">감정 선택</h3>
            <div className="grid grid-cols-6 gap-2">
            {EMOTIONS.map((emotion) => (
                <button
                key={emotion.label}
                onClick={() => {
                    setSelectedEmotion(emotion.label)
                    setSelectedTags([])
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border hover:shadow transition text-sm ${selectedEmotion === emotion.label ? emotion.color + " ring-2 ring-black/60" : "bg-white"}`}
                >
                <span className="text-xl">{emotion.icon}</span>
                {emotion.label}
                </button>
            ))}
            </div>
        </div>

        <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">감정 일기</h3>
            <textarea
            rows="4"
            className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring focus:ring-gray-300"
            placeholder="오늘 어떤 일이 있었나요? 어떤 감정을 느꼈나요?"
            value={diary}
            onChange={(e) => setDiary(e.target.value)}
            />
        </div>

        {selectedEmotion && (
            <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">감정 태그 선택</h3>
            <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm border ${selectedTags.includes(tag) ? "bg-yellow-300 text-black" : "bg-white text-gray-600"}`}
                >
                    {tag}
                </button>
                ))}
            </div>
            </div>
        )}

        <div className="mb-4 text-right">
            <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-blue-600 hover:underline"
            >
            {showDetails ? "상세 입력 닫기" : "상세하게 작성하기"}
            </button>
        </div>

        {showDetails && (
            <div className="mb-6 space-y-4">
            <h3 className="text-sm font-semibold">상세 감정 기록</h3>
            <textarea className="w-full border rounded-xl p-3 text-sm" placeholder="1. 왜 그런 감정을 느꼈나요?" value={details.why} onChange={(e) => setDetails({ ...details, why: e.target.value })} />
            <textarea className="w-full border rounded-xl p-3 text-sm" placeholder="2. 그 상황은 어떤 상황이었나요?" value={details.situation} onChange={(e) => setDetails({ ...details, situation: e.target.value })} />
            <textarea className="w-full border rounded-xl p-3 text-sm" placeholder="3. 누구 때문이었나요?" value={details.who} onChange={(e) => setDetails({ ...details, who: e.target.value })} />
            <textarea className="w-full border rounded-xl p-3 text-sm" placeholder="4. 감정을 해소할 방법은?" value={details.howToHeal} onChange={(e) => setDetails({ ...details, howToHeal: e.target.value })} />
            <textarea className="w-full border rounded-xl p-3 text-sm" placeholder="5. 해소되지 않은 방법은?" value={details.notWork} onChange={(e) => setDetails({ ...details, notWork: e.target.value })} />
            <textarea className="w-full border rounded-xl p-3 text-sm" placeholder="6. 효과 있었던 방법은?" value={details.worked} onChange={(e) => setDetails({ ...details, worked: e.target.value })} />
            <textarea className="w-full border rounded-xl p-3 text-sm" placeholder="7. 앞으로 어떻게 예방할 수 있을까요?" value={details.prevent} onChange={(e) => setDetails({ ...details, prevent: e.target.value })} />
            </div>
        )}

        <div className="flex justify-end">
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                onClick={handleSubmit}>
            감정 저장하기
            </button>
        </div>
        </div>
    )
}