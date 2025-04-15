import CommunityForm from "../components/community/CommunityForm"; 
import CommunityList from "../components/community/CommunityList"; 
import { fetchCommunityList } from "../api/community"; 
import { useEffect, useState } from "react";

export default function CommunityListPage() {
  const [data, setData] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    size: 10,
    sort: null,
    emotionType: null,
  });


  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchCommunityList(params);
        setData(res);
      } catch (e) {
        console.error("게시글 목록 조회 실패", e);
      }
    };
    load();
  }, [params]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold">감정 공유 커뮤니티</h1>
        <p className="text-gray-500">비슷한 감정을 가진 사람들과 공감대를 형성해보세요</p>
      </div>

      <CommunityForm onPostCreated={() => setParams({ ...params })} />
      {data && (
        <>
          <CommunityList posts={data.content} />
        </>
      )}
    </div>
  );
}
