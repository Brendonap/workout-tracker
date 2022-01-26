import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./home.module.scss";
import { deleteExercise, getExercises, postExercise } from "../../api";
import Exercise from "../../components/exercise";
import { getNewSet, groupBy, sortObject } from "../../utils";
import ReactDOM from "react-dom";
import Button from "../../components/button";
import Loading from "../../components/loading";
import { ExerciseType } from "../../types";
import { useAppState } from "../../store";

const Home = () => {
  const { state } = useAppState();
  const [exercises, setExercises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchExercises = async () => {
    try {
      setIsLoading(true);
      const data = await getExercises();
      setExercises(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewExercise = async () => {
    const exerciseId = await postExercise({
      categoryId: state.availableExercises?.[0].id,
    });
    setExercises([
      ...exercises,
      {
        id: exerciseId,
        createdDate: new Date().toLocaleDateString(),
        createdTimestamp: +new Date(),
        userId: state.uid,
        sets: [getNewSet()],
      },
    ]);
  };

  const removeExercise = async (exerciseId: string) => {
    await deleteExercise(exerciseId);
    setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const groupedExercise = sortObject(groupBy(exercises, "createdDate"));

  const ActionPortal = () => {
    const achorElement = document.getElementById("action-portal");
    if (!achorElement) return null;
    return ReactDOM.createPortal(
      <Button onClick={addNewExercise}>ADD new</Button>,
      achorElement
    );
  };

  return (
    <div className={cn(styles["container"])}>
      <ActionPortal />

      {(isLoading && (
        <div className={styles["loading"]}>
          <Loading />
        </div>
      )) ||
        (Object.keys(groupedExercise).length &&
          Object.entries(groupedExercise).map(([date, exercise]: any) => {
            return (
              <React.Fragment key={date}>
                <div>{date}</div>
                <div className={cn(styles["exercise-container"])}>
                  {exercise
                    .sort((a: ExerciseType, b: ExerciseType) =>
                      a.createdTimestamp > b.createdTimestamp ? -1 : 1
                    )
                    .map((exercise: any) => {
                      return (
                        <Exercise
                          key={exercise.id}
                          {...{
                            availableExercises: state.availableExercises || [],
                            exercise,
                            removeExercise,
                          }}
                        />
                      );
                    })}
                </div>
              </React.Fragment>
            );
          })) ||
        null}
    </div>
  );
};

export default Home;
