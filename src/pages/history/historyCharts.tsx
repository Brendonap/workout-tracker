import cn from "classnames";
import React from "react";
import CustomLineChart from "../../components/charts/line";
import CustomScatterChart from "../../components/charts/scatter";
import { HistoryChartsPropType } from "../../types";
import styles from "./history.module.scss";

const HistoryCharts = ({ chartData }: HistoryChartsPropType) => {
  return (
    <>
      <h3>Total Volume</h3>
      <div className={cn(styles["chart-container"])}>
        <CustomLineChart data={chartData.volume} lines={["volume"]} />
      </div>
      <h3>All Sets</h3>
      <div className={cn(styles["chart-container"])}>
        <CustomScatterChart data={chartData.scatter} />
      </div>
    </>
  );
};

export default HistoryCharts;
