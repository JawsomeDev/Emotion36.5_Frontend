// src/components/EmotionRecordList.jsx
import React, { useEffect, useState } from "react"
import { useNavigate, useSearchParams, useParams } from "react-router-dom"
import PageComponent from "./common/PageComponent"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ko } from "date-fns/locale"
import { format } from "date-fns"
import { FaFilter, FaRegEdit, FaTrashAlt, FaEye } from "react-icons/fa"
import { getList } from "../api/record"

const getNum = (value, defaultValue) => {
  const parsed = parseInt(value)
  return isNaN(parsed) ? defaultValue : parsed
}

const EMOTION_COLORS = {
  기쁨: "bg-yellow-100 text-yellow-800",
  슬픔: "bg-blue-100 text-blue-800",
  화남: "bg-red-100 text-red-800",
  평온: "bg-green-100 text-green-800",
  불안: "bg-purple-100 text-purple-800",
  피곤: "bg-gray-100 text-gray-800"
}

const EMOTION_FILTERS = [
  { label: "전체", value: "all" },
  { label: "😊 기쁨", value: "기쁨" },
  { label: "😢 슬픔", value: "슬픔" },
  { label: "😠 화남", value: "화남" },
  { label: "😌 평온", value: "평온" },
  { label: "😰 불안", value: "불안" },
  { label: "😴 피곤", value: "피곤" }
]

const EMOTION_META = {
    JOY: { emoji: "😊", label: "기쁨", color: "bg-yellow-100 text-yellow-800", tagColor: "bg-yellow-200 text-yellow-900" },
    SADNESS: { emoji: "🥲", label: "슬픔", color: "bg-blue-100 text-blue-800", tagColor: "bg-blue-200 text-blue-900" },
    ANGER: { emoji: "😠", label: "화남", color: "bg-red-100 text-red-800", tagColor: "bg-red-200 text-red-900" },
    CALM: { emoji: "😌", label: "평온", color: "bg-green-100 text-green-800", tagColor: "bg-green-200 text-green-900" },
    FEAR: { emoji: "😰", label: "불안", color: "bg-purple-100 text-purple-800", tagColor: "bg-purple-200 text-purple-900" },
    TIRED: { emoji: "😴", label: "피곤", color: "bg-gray-100 text-gray-800", tagColor: "bg-gray-200 text-gray-900" }
    }

export default function EmotionRecordList() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [queryParams, setQueryParams] = useSearchParams()
  const [openMenuId, setOpenMenuId] = useState(null)
  const [openDetailId, setOpenDetailId] = useState(null)

  const page = getNum(queryParams.get("page"), 1)
  const size = getNum(queryParams.get("size"), 10)
  const selectedDate = queryParams.get("date") ? new Date(queryParams.get("date")) : null
  const selectedEmotion = queryParams.get("emotion") || "all"

  const [serverData, setServerData] = useState({
    currentPage: 1,
    prev: false,
    next: false,
    prevPage: null,
    nextPage: null,
    pageNumList: [],
    content: []
  })

  const movePage = ({ page }) => {
    const newParams = { page, size }
    if (selectedDate) newParams.date = format(selectedDate, "yyyy-MM-dd")
    if (selectedEmotion && selectedEmotion !== "all") newParams.emotion = selectedEmotion
    setQueryParams(newParams)
  }

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd")
    const currentSelectedDate = queryParams.get("date")

    const newParams = { page: 1, size }
    if (currentSelectedDate === formattedDate) {
      if (selectedEmotion && selectedEmotion !== "all") newParams.emotion = selectedEmotion
    } else {
      newParams.date = formattedDate
      if (selectedEmotion && selectedEmotion !== "all") newParams.emotion = selectedEmotion
    }
    setQueryParams(newParams)
  }

  const handleEmotionFilter = (emotion) => {
    const newParams = { page: 1, size }
    if (selectedDate) newParams.date = format(selectedDate, "yyyy-MM-dd")
    if (emotion !== "all") newParams.emotion = emotion
    setQueryParams(newParams)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getList(id, {
          page,
          size,
          date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined,
          emotion: selectedEmotion !== "all" ? selectedEmotion : undefined
        })
        setServerData(result)
      } catch (err) {
        console.error("데이터 불러오기 실패", err)
      }
    }

    fetchData()
  }, [id, page, size, queryParams])

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-1">감정 기록 보기</h2>
      <p className="text-sm text-gray-500 mb-6">지금까지 기록한 감정들을 확인하고 관리하세요</p>

      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-wrap gap-2">
          {EMOTION_FILTERS.map(filter => (
            <button
              key={filter.value}
              className={`px-3 py-1 text-sm rounded-full border hover:bg-gray-100 ${selectedEmotion === filter.value ? "bg-gray-50 text-black" : "bg-white text-gray-150"}`}
              onClick={() => handleEmotionFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            locale={ko}
            dateFormat="yyyy-MM-dd"
            customInput={
              <button className="flex items-center gap-2 border px-4 py-2 rounded-2xl text-sm text-black bg-white hover:shadow">
                <FaFilter className="text-black " /> 날짜 필터
              </button>
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        {serverData.content.map((record) => (
          <div
          key={record.id}
          className={`border p-4 rounded-xl shadow-sm hover:shadow-md transition ${EMOTION_META[record.emotion]?.color || "bg-white"}`}
        >
          <div className="flex justify-between items-start">
            <div className="w-full">
              <div className="flex items-center gap-2 text-base font-semibold">
                <span>{EMOTION_META[record.emotion]?.emoji}</span>
                <span>{EMOTION_META[record.emotion]?.label}</span>
                <span className="text-sm ml-2">{record.date}</span>
              </div>
              <p className="text-base mt-2 whitespace-pre-wrap">{record.diary}</p>
              <div className="mt-2 flex gap-1 flex-wrap">
                {record.emotionTags?.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 text-xs rounded-full border ${EMOTION_META[record.emotion]?.tagColor || "bg-white text-black"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
                {openDetailId === record.id && (
                    <div className="mt-4 bg-white p-4 rounded-md border text-sm space-y-2">
                        {[
                        { key: "reason", label: "이유" },
                        { key: "situation", label: "상황" },
                        { key: "relatedPerson", label: "관련 인물" },
                        { key: "reliefAttempt", label: "해소 방법" },
                        { key: "reliefFailedReason", label: "해소 실패 이유" },
                        { key: "reliefSucceeded", label: "효과 있었던 방법" },
                        { key: "prevention", label: "예방 방법" }
                        ].map(({ key, label }) => (
                        <div key={key} className="flex gap-2">
                            <span className="font-semibold w-28">{label}</span>
                            <span>{record[key] || "-"}</span>
                        </div>
                        ))}
                    </div>
                    )}

            </div>
        
            {/* 메뉴 버튼 */}
            <div className="relative">
              <div
                className="text-black hover:text-gray-800 cursor-pointer"
                onClick={() => setOpenMenuId(openMenuId === record.id ? null : record.id)}
              >
                ⋯
              </div>
                {openMenuId === record.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-sm" onClick={() => setOpenDetailId(openDetailId === record.id ? null : record.id)}>
                      <FaEye className="text-gray-600" /> 상세보기
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-sm" onClick={() => console.log("수정", record.id)}>
                      <FaRegEdit className="text-gray-600" /> 수정하기
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-sm text-red-500" onClick={() => console.log("삭제", record.id)}>
                      <FaTrashAlt className="text-red-500" /> 삭제하기
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <PageComponent serverData={serverData} movePage={movePage} />
    </div>
  )
}
