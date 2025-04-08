
import React from 'react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface DataPoint {
  name: string;
  [key: string]: number | string;
}

interface LineChartProps {
  data: DataPoint[];
  lines: {
    key: string;
    name: string;
    color: string;
  }[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  lines,
  xAxisLabel,
  yAxisLabel,
  height = 300
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="name" 
          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
          axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
          tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
          label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -10, fill: 'rgba(255,255,255,0.6)' } : undefined}
        />
        <YAxis 
          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
          axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
          tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
          label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.6)' } : undefined}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            borderColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          }}
          labelStyle={{
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 'bold',
            marginBottom: '0.25rem',
          }}
          itemStyle={{
            padding: '0.25rem 0',
          }}
        />
        {lines.map((line, index) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            name={line.name}
            stroke={line.color}
            strokeWidth={2}
            dot={{ r: 3, fill: line.color, strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
