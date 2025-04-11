import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWeeklyAnalysis } from "../api/record";
import { useAuth } from "./context/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function EmotionChart() {
  const [data, setData] = useState([]);
  const {user} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  if(!user) return;
    const load = async () => {
      try {
        const res = await fetchWeeklyAnalysis();
        if (res?.flow) {
          setData(res.flow);
        } else {
          console.warn(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  return (
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-semibold">이번 주 감정 흐름</h2>
      <p className="text-base text-gray-500">지난 7일간의 감정 변화를 확인해보세요</p>

      <div className="rounded-md border h-72 px-4 py-2">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="data" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 14 }} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#a78bfa"
                strokeWidth={2}
                dot={{ r: 4, stroke: '#a78bfa', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            데이터가 없습니다.
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate("/analyze")}
          className="mt-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition flex items-center gap-1"
        >
          더 자세한 분석 보기 →
        </button>
      </div>
    </div>
  );
}
