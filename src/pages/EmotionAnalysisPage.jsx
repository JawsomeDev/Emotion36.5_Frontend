import React, { useEffect, useState } from "react";
import {
  fetchEmotionDistribution,
  fetchMonthlyAnalysis,
  fetchWeeklyAnalysis
} from "../api/record";
import EmotionLineChart from "../components/EmotionLineChart";
import EmotionBarChart from "../components/EmotionBarChart";
import EmotionPieChart from "../components/EmotionPieChart";

const EmotionAnalysisPage = () => {
  const [tab, setTab] = useState("weekly");
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (tab === "weekly") {
          const res = await fetchWeeklyAnalysis();
          setData(res);
        } else if (tab === "monthly") {
          const res = await fetchMonthlyAnalysis();
          setData(res);
        } else if (tab === "distribution") {
          const res = await fetchEmotionDistribution();
          setData(res);
        }
      } catch (err) {
        console.error("분석 데이터를 불러오지 못했습니다.", err);
      }
    };

    loadData();
  }, [tab]);

  return (
    <div className="max-w-5xl mx-auto p-8 pt-24 space-y-12">
      {/* 탭 */}
      <div className="flex justify-center space-x-4 mb-6">
        {["weekly", "monthly", "distribution"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full border transition-all font-semibold 
              ${tab === t
                ? "bg-black text-white border-black shadow"
                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-100"}`}
          >
            {t === "weekly" && "주간 분석"}
            {t === "monthly" && "월간 분석"}
            {t === "distribution" && "전체 분포"}
          </button>
        ))}
      </div>

      {!data && (
        <p className="text-center text-gray-400">📉 데이터를 불러오는 중입니다...</p>
      )}

      {/* 주간/월간 분석 */}
      {tab !== "distribution" && data && data.flow?.length > 0 && (
        <>
          <section className="space-y-8">
            <h2 className="text-xl font-bold">📈 감정 흐름</h2>
            <EmotionLineChart data={data.flow} />

            <h2 className="text-xl font-bold">📊 감정별 기록 횟수</h2>
            <EmotionBarChart data={data.countByEmotion} />

            {data.summary && (
              <div className="bg-white rounded-xl p-6 shadow space-y-2 border border-gray-100">
                <p><strong>감정 요약:</strong> {data.summary.pattern}</p>
                <p><strong>조언:</strong> {data.summary.recommendation}</p>
              </div>
            )}
          </section>
        </>
      )}

      {/* 전체 분포 */}
      {tab === "distribution" && data && Object.keys(data).length > 0 && (
        <>
          <section className="space-y-8">
            <h2 className="text-xl font-bold">📊 전체 감정 분포</h2>
            <EmotionPieChart data={data} />
          </section>
        </>
      )}
    </div>
  );
};

export default EmotionAnalysisPage;
