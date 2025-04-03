import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api`

const EMOTION_TO_ENUM = {
    기쁨: "JOY",
    슬픔: "SADNESS",
    화남: "ANGER",
    평온: "CALM",
    불안: "FEAR",
    피곤: "TIRED"
  };

// 감정 등록
export const createEmotionRecord = async (data) => {
  const response = await axios.post(`${prefix}/emotions/create`, data)

  return response.data
}




  export const getList = async (id, pageParam) => {
    const { emotion, date, ...rest } = pageParam;
  
    const params = {
      ...rest,
      ...(emotion && emotion !== "all" && { emotion: EMOTION_TO_ENUM[emotion] }),
      ...(date && { date }) // 날짜가 있을 때만 포함
    };
  
    const res = await axios.get(`${prefix}/emotions/list/${id}`, {
      params
    });
  
    return res.data;
  };
  
