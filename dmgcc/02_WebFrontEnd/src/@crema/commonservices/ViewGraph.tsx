import React from "react";
import {
  LineChart,
  ResponsiveContainer,
  Legend, Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import CommonTooltip from "./CommonLeged";

interface ViewGraphProps {
  data: {
    name: string;
    rate: number;
    month:string;
  }[];
}
const ViewGraph: React.FC<ViewGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart
        data={data}
        margin={{ top: 30, right: 0, left: 0, bottom: 20 }}
      >
        <CartesianGrid />
        <XAxis dataKey="dateofreport"
          interval={'preserveStartEnd'} />
        <YAxis></YAxis>
        <Legend/>
        <Line
          type="monotone"
          dataKey="capacity"
          stroke="rgba(0, 103, 127, 1)"
          // dot={false}
          strokeWidth={2}
          activeDot={{ r: 4 }}
        />
        <Tooltip  content={<CommonTooltip />}  />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ViewGraph;
