import React, { useEffect, useState } from "react";
import cn from "classnames";
import Card from "../../components/card";
import styles from "./trackProgress.module.scss";
import Select from "../../components/select";
import Input from "../../components/input";
import Button from "../../components/button";
import { getProgressHistory, postTrackProgress } from "../../api";
import { dateToLocalString, notify } from "../../utils";
import { LineChartDataType } from "../../types";
import CustomLineChart from "../../components/charts/line";
import { MdLeaderboard } from "react-icons/md";
import { useAppState } from "../../store";

const TrackProgress = () => {
  const { state } = useAppState();
  const progressOptions = [
    {
      id: "weight",
      label: "Weight",
      value: "weight",
    },
    {
      id: "body-fat-perc",
      label: "Body Fat Percentage",
      value: "Body Fat Perc",
    },
  ];

  const [progressValue, setProgressValue] = useState<string | number>();
  const [selectValue, setSelectValue] = useState<string>(
    progressOptions[0].value
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [history, setHistory] = useState<LineChartDataType[]>([]);

  const handleSelectProgress = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectValue(event.target.value);
  };

  const handleChangeProgressValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProgressValue(event.target.value);
  };

  const submitProgress = async () => {
    if (!progressValue) return;
    try {
      await postTrackProgress({
        category: selectValue,
        value: progressValue,
        createdTimestamp: +new Date(),
        userId: state.uid,
      });
      setProgressValue(0);

      setHistory([
        {
          name: dateToLocalString(new Date()),
          value: progressValue,
        },
        ...history,
      ]);
      notify("Progress Saved");
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProgressData = async (category: string) => {
    setIsLoading(true);
    try {
      const data = await getProgressHistory(category);
      setHistory(
        data.map((x) => {
          return {
            name: dateToLocalString(x.createdTimestamp),
            value: x.value,
          };
        })
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressData(selectValue);
  }, [selectValue]);

  return (
    <div className={cn(styles.container)}>
      <Card>
        <div className={cn(styles["card-container"])}>
          <Select
            value={selectValue}
            options={progressOptions.map((x) => {
              return {
                ...x,
                value: x.id,
              };
            })}
            onChange={handleSelectProgress}
          />
          <div className={cn(styles["input-container"])}>
            <Input
              id={"input-progress"}
              type="text"
              name={selectValue}
              placeholder={selectValue}
              value={progressValue}
              onChange={handleChangeProgressValue}
            />
            <Button onClick={submitProgress}>Submit</Button>
          </div>
        </div>
      </Card>
      <Card classNames={styles["history-card"]} isLoading={isLoading}>
        {(history.length > 2 && (
          <CustomLineChart data={history} lines={["value"]} />
        )) || (
          <div className={cn(styles["chart-placeholder"])}>
            <MdLeaderboard />
            <span>not enough data, record atleast 3 data points to view.</span>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TrackProgress;
