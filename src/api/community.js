import axiosInstance from "./axiosInstance";

const API_SERVER_HOST = "http://localhost:8080";

export const fetchCommunityList = async ({ page = 1, emotionType = null }) => {
  const params = {
    page,
  };
  if (emotionType) {
    params.emotionType = emotionType;
  }

  const res = await axiosInstance.get("/communities", { params });
  return res.data; // 반드시 서버에서 content, pageNumList 등 포함한 페이징 구조로 줘야 함
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
  
  // 게시글 단건 조회
export const getCommunityPost = async (postId) => {
  const res = await axiosInstance.get(`/communities/${postId}`);
  return res.data;
};

// 댓글 작성
export const createComment = async (data) => {
  const res = await axiosInstance.post("/comments", data);
  return res.data; // 반환값: 생성된 댓글 id
};

// 댓글 조회
export const getCommentsByPostId = async (postId) => {
  const res = await axiosInstance.get(`/comments?communityId=${postId}`);
  return res.data;
};

// 게시글 삭제
export const deletePost = async (postId) => {
  return await axiosInstance.delete(`/communities/${postId}`);
};

// 게시글 수정
export const updatePost = async (postId, updateData) => {
  return await axiosInstance.put(`/communities/${postId}`, updateData);
};


export const likeComment = (commentId) => {
  return axiosInstance.post(`/comments/${commentId}/like`);
};

// 댓글 좋아요 취소
export const unlikeComment = (commentId) => {
  return axiosInstance.delete(`/comments/${commentId}/like`);
};

// 댓글 좋아요 여부 확인 (optional - 만약 isLikedComment가 따로 있다면 그대로 사용)
export const isLikedComment = (commentId) => {
  return axiosInstance.get(`/comments/${commentId}/like`);
};