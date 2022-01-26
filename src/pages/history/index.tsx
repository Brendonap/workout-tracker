import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./history.module.scss";
import Card from "../../components/card";
import Select from "../../components/select";
import { getExercisesByCategory } from "../../api";
import {
  AvailableExerciseType,
  CustomScatterChartDataType,
  ExerciseType,
  HistoryChartDataType,
  LineChartDataType,
  OptionType,
  SetType,
} from "../../types";
import Loading from "../../components/loading";
import { MdLeaderboard } from "react-icons/md";
import HistoryCharts from "./historyCharts";
import { useAppState } from "../../store";

const getLineData = (exercises: ExerciseType[]): LineChartDataType[] => {
  return exercises.map((exercise) => {
    const volume = exercise.sets.reduce((total: number, current: SetType) => {
      return total + current.reps * current.weight;
    }, 0);

    return {
      name: exercise.createdDate,
      volume,
    };
  });
};

const getScatterData = (
  exercises: ExerciseType[]
): CustomScatterChartDataType[] => {
  return exercises.reduce((total: any[], current: ExerciseType) => {
    const sets = current.sets
      .filter((set) => {
        return (
          (!total.length && true) ||
          total.find((x) => x.y !== set.reps && x.y !== set.weight)
        );
      })
      .map((set) => {
        return {
          x: set.reps,
          y: set.weight,
          z: current.createdDate,
        };
      });
    console.log({ sets });
    return [...total, ...sets];
  }, []);
};

const History = () => {
  const { state } = useAppState();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [availableExercises, setAvailableExercises] = useState<OptionType[]>();
  const [isLoading, setIsLoading] = useState<{ page: boolean; data: boolean }>({
    page: true,
    data: false,
  });
  const [chartData, setChartData] = useState<HistoryChartDataType>();
  const [exercises, setExercises] = useState<ExerciseType[]>([]);

  const fetchData = async (id: string) => {
    try {
      setIsLoading(() => {
        return {
          ...isLoading,
          data: true,
        };
      });
      const exercises = await getExercisesByCategory(id);

      setChartData({
        volume: getLineData(exercises),
        scatter: getScatterData(exercises),
      });
      setExercises(exercises);

      console.log({ exercises });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(() => {
        return {
          ...isLoading,
          data: false,
        };
      });
    }
  };

  const fetchAvailableCategories = async () => {
    try {
      setAvailableExercises(() => [
        { id: "", label: "Choose a Category", value: "" },
        ...(state.availableExercises || []).map(
          (category: AvailableExerciseType) => {
            return {
              id: category.id,
              label: category.label,
              value: category.label,
            };
          }
        ),
      ]);
      setIsLoading((prev) => {
        return {
          ...prev,
          page: false,
        };
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event.target.value);
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    fetchAvailableCategories();
  }, [state.availableExercises]);

  useEffect(() => {
    if (selectedCategory) {
      fetchData(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div className={cn(styles.container)}>
      {
        <Card classNames={styles.card} isLoading={isLoading.page}>
          <div className={cn(styles["card-container"])}>
            <Select
              value={selectedCategory}
              options={availableExercises as OptionType[]}
              onChange={handleSelectCategory}
              placeholder="Choose Category"
            />
            {(isLoading.data && (
              <div className={styles["data-loading"]}>
                <Loading />
              </div>
            )) ||
              (exercises.length >= 3 && chartData && (
                <HistoryCharts chartData={chartData} />
              )) || (
                <div className={cn(styles["chart-placeholder"])}>
                  <MdLeaderboard />
                  <span>
                    {(!selectedCategory && "select a category to view") ||
                      "not enough data, complete and record atleast 3 workouts with this exercise"}
                  </span>
                </div>
              )}
          </div>
        </Card>
      }
    </div>
  );
};

export default History;
