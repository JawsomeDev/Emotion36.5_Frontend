import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api`

// 감정 등록
export const createEmotionRecord = async (data) => {
  const response = await axios.post(`${prefix}/emotions/create`, data)

  return response.data
}
