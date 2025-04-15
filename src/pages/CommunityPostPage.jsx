// src/pages/CommunityPostPage.jsx
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

  if (loading) return <div className="text-center mt-10">불러오는 중...</div>;
  if (!post) return <div className="text-center text-red-500 mt-10">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* ✅ 게시글 상세 */}
      <CommunityPostDetail />

      {/* ✅ 댓글 작성 */}
      <h2 className="text-xl font-semibold">댓글 작성</h2>
      <CommentForm postId={post.id} onCommentAdded={fetchPost} />

      {/* ✅ 댓글 리스트 */}
      <h2 className="text-xl font-semibold mt-6">댓글 {post.commentCount}개</h2>
      <CommentList postId={post.id} />
    </div>
  );
}
