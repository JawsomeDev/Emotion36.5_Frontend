import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from "recharts";
  
  const COLORS = [
    "#6366f1", // indigo
    "#34d399", // emerald
    "#fbbf24", // amber
    "#f87171", // rose
    "#10b981", // green
    "#e879f9"  // fuchsia
  ];
  
  const EmotionPieChart = ({ data }) => {
    const chartData = Object.entries(data).map(([name, value]) => ({
      name,
      value
    }));
  
    if (!chartData || chartData.length === 0)
      return <p className="text-gray-400">데이터가 없습니다.</p>;
  
    return (
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={{ fontSize: 12 }}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 14 }} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default EmotionPieChart;
  