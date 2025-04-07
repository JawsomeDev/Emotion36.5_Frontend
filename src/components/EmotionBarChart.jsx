import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
  } from "recharts";
  
  const EmotionBarChart = ({ data }) => {
    const chartData = Object.entries(data).map(([emotion, count]) => ({
      emotion,
      count
    }));
  
    if (!chartData || chartData.length === 0)
      return <p className="text-gray-400">데이터가 없습니다.</p>;
  
    return (
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="emotion"
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ borderRadius: 8, fontSize: 14 }}
              cursor={{ fill: '#f3f4f6' }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar
              dataKey="count"
              fill="#34d399"
              name="기록 횟수"
              barSize={40}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default EmotionBarChart;
  