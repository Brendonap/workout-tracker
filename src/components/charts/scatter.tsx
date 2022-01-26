import React from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { CustomScatterChartPropType } from "../../types";

const CustomScatterChart = ({ data }: CustomScatterChartPropType) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        // width={730}
        height={250}
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="x" name="reps" />
        <YAxis dataKey="y" name="weight" unit="kg" />
        <ZAxis dataKey="z" name="date" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />

        <Scatter name="All Sets" data={data} fill="#ffe999" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CustomScatterChart;
