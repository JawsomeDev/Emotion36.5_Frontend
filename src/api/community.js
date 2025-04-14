import axiosInstance from "./axiosInstance";

const API_SERVER_HOST = "http://localhost:8080";

// 커뮤니티 게시글 목록 조회
export const fetchCommunityList = async ({ page = 1, sort = "recent", emotionType = null }) => {
  const params = {
    page,
    sort,
  };
  if (emotionType) {
    params.emotionType = emotionType;
  }

  const res = await axiosInstance.get("/communities", { params });
  return res.data;
};

export const createCommunityPost = async (data) => {
    const res = await axiosInstance.post("/communities", data);
    return res.data;
  };
  

// 좋아요 추가
export const likePost = (postId) =>
    axiosInstance.post(`/communities/${postId}/like`);
  
  // 좋아요 취소
  export const unlikePost = (postId) =>
    axiosInstance.delete(`/communities/${postId}/like`);
  
  // 현재 유저가 좋아요 눌렀는지 확인
  export const isLikedPost = (postId) =>
    axiosInstance.get(`/communities/${postId}/like`);
  
  // 댓글 개수 조회
  export const getCommentCount = (postId) =>
    axiosInstance.get(`/comments`, { params: { communityId: postId } });
  