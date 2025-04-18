import axiosInstance from "./axiosInstance";

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
  const response = await axiosInstance.post(`${prefix}/emotions/create`, data)

  return response.data
}

  export const getList = async (id, pageParam) => {
    const { emotion, date, ...rest } = pageParam;
  
    const params = {
      ...rest,
      ...(emotion && emotion !== "all" && { emotion: EMOTION_TO_ENUM[emotion] }),
      ...(date && { date }) // 날짜가 있을 때만 포함
    };
  
    const res = await axiosInstance.get(`${prefix}/emotions/list`, {
      params
    });
  
    return res.data;
  };

  export async function updateRecord(id, data) {
    const res = await axiosInstance.put(`/emotions/update/${id}`, data);
    return res.data;
  }

  export async function deleteRecord(id){
    const res = await axiosInstance.delete(`/emotions/delete/${id}`);
    return res.data;
  }
  
  export const fetchMonthlyAnalysis = async () => {
    const res = await axiosInstance.get("/analysis/monthly");
    return res.data;
  };
  
  export const fetchEmotionDistribution = async () => {
    const res = await axiosInstance.get("/analysis/distribution");
    return res.data;
  };

  export const fetchWeeklyAnalysis = async () => {
    const res = await axiosInstance.get("/analysis/weekly");
    return res.data;
  }

  export const fetchEmotionRecommendations = async (emotion) => {
    const res = await axiosInstance.get(`${prefix}/recommend/latest`, {
      params: { emotion }
    });
  
    return res.data;
  };
  
  export const fetchLatestRecommendations = async () => {
  const res = await axiosInstance.get("/recommend/latest");
  return res.data;
};