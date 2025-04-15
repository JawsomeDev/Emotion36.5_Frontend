import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommunityPostDetail from "../components/community/CommunityPostDetail";
import CommentForm from "../components/community/CommentForm";
import CommentList from "../components/community/CommentList";
import { getCommunityPost } from "../api/community";

export default function CommunityPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); // ✅ 댓글 새로고침용

  const fetchPost = async () => {
    try {
      const data = await getCommunityPost(postId);
      setPost(data);
    } catch (err) {
      console.error("게시글 상세 로딩 실패", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleCommentAdded = () => {
    setRefreshKey((prev) => prev + 1); // ✅ CommentList 새로 불러오도록 트리거
  };

  if (loading) return <div className="text-center mt-10">불러오는 중...</div>;
  if (!post) return <div className="text-center text-red-500 mt-10">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <CommunityPostDetail />

      <h2 className="text-xl font-semibold">댓글 작성</h2>
      <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} /> {/* ✅ 콜백 전달 */}

      <h2 className="text-xl font-semibold mt-6">댓글 {post.commentCount}개</h2>
      <CommentList postId={post.id} triggerRefresh={refreshKey} /> {/* ✅ 트리거 전달 */}
    </div>
  );
}
