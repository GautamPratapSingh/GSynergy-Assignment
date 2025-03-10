// src/components/Chart.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChartData } from '../redux/chartSlice';
import { RootState, AppDispatch } from '../redux/store';
import {
  BarChart,
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Chart.css';

const Chart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.chart);
  const [selectedStore, setSelectedStore] = useState<string>('ST035');

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  const filteredData = data.filter((item) => item.Store === selectedStore);

  const weeks = Array.from(new Set(filteredData.map((item) => item.Week)));
  const chartData = weeks.map((week) => {
    const weekData = filteredData.filter((item) => item.Week === week);
    const totalSalesDollars = weekData.reduce((sum, item) => sum + item["Sales Dollars"], 0);
    const totalGMDollars = weekData.reduce((sum, item) => sum + item["GM Dollars"], 0);
    const gmPercent = totalSalesDollars ? (totalGMDollars / totalSalesDollars) * 100 : 0;

    return {
      Week: week,
      "GM Dollars": totalGMDollars,
      "GM %": gmPercent,
    };
  });

  return (
    <div className="chart-container">
      <h2>Gross Margin</h2>
      <select
        value={selectedStore}
        onChange={(e) => setSelectedStore(e.target.value)}
        className="store-select"
      >
        <option value="ST035">San Francisco Bay Trends</option>
        <option value="ST036">Chicago Charm Boutique</option>
      </select>

      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
    <ResponsiveContainer width="100%" height={400}>
     <ComposedChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
    
    {/* X-Axis for Weeks */}
    <XAxis dataKey="Week" />
    
    {/* Left Y-Axis for GM Dollars */}
    <YAxis
      yAxisId="left"
      tickFormatter={(value) => `$${value.toLocaleString()}`}
    />
    
    {/* Right Y-Axis for GM % */}
    <YAxis
      yAxisId="right"
      orientation="right"
      tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
    />
    
    <Tooltip />
    <Legend />
    
    {/* Bar for GM Dollars */}
    <Bar
      yAxisId="left"
      dataKey="GM Dollars"
      fill="#3498db"
      name="GM Dollars"
    />
    
    {/* Orange line graph for GM % */}
    <Line
      yAxisId="right"
      type="monotone"
      dataKey="GM %"
      stroke="#e67e22"
      strokeWidth={2}
      dot={false}
      name="GM %"
    />
  </ComposedChart>
</ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;