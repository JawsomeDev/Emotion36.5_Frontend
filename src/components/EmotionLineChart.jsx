import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
  } from "recharts";
  
  const EmotionLineChart = ({ data }) => {
    if (!data || data.length === 0) return <p className="text-gray-400">데이터가 없습니다.</p>;
  
    return (
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="data" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 14 }} />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 5, stroke: '#6366f1', strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 7 }}
              name="감정 점수"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default EmotionLineChart;