import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomLineChartPropTypes } from "../../types";

const CustomLineChart = ({ data, lines }: CustomLineChartPropTypes) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" />
        <YAxis width={40} />
        <Tooltip />
        {lines.map((config) => {
          return (
            <Line
              key={config}
              type="monotone"
              dataKey={config}
              stroke="#ffe999"
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
