/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { putExercise } from "../../api";
import useDebounce from "../../hooks/useDebounce";
import Card from "../card";

import cn from "classnames";
import styles from "./exercise.module.scss";
import { MdClose, MdAdd, MdDeleteForever } from "react-icons/md";
import { ExercisePropTypes, ExerciseType, SetType } from "../../types";
import Select from "../select";
import Input from "../input";
import { getNewSet } from "../../utils";

const Exercise = ({
  availableExercises,
  exercise,
  removeExercise,
}: ExercisePropTypes) => {
  const [currentExercise, setCurrentExercise] = useState(exercise);
  const debouncedExercise = useDebounce<ExerciseType>(currentExercise, 500);

  const updateExercise = (updatedExercise: ExerciseType) => {
    putExercise(exercise.id, updatedExercise);
  };

  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentExercise({
      ...currentExercise,
      categoryId: event.target.value,
    });
  };

  const addNewSet = () => {
    setCurrentExercise({
      ...currentExercise,
      sets: [...(currentExercise.sets || []), getNewSet()],
    });
  };

  const _findSetIndexById = (setId: string) => {
    return currentExercise.sets.findIndex(
      ({ id }: { id: string }) => id === setId
    );
  };

  const handleChangeSet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const setId = event.target.getAttribute("data-id");
    const newValue = event.target.value;

    if (!setId) {
      console.error("no set Id found");
      return;
    }

    const setIndex = _findSetIndexById(setId);
    const updatedSets = currentExercise.sets;

    updatedSets[setIndex] = {
      ...updatedSets[setIndex],
      [event.target.name]: newValue,
    };

    setCurrentExercise({
      ...currentExercise,
      sets: updatedSets,
    });
  };

  const handleDeleteSet = (setId: string) => {
    setCurrentExercise({
      ...currentExercise,
      sets: currentExercise.sets.filter((set: SetType) => set.id !== setId),
    });
  };

  useEffect(() => {
    updateExercise(debouncedExercise);
  }, [debouncedExercise]);

  return (
    <Card>
      <div className={cn(styles["exercise"])}>
        <div className={cn(styles["action-container"])}>
          <div className={cn(styles["action-container-select"])}>
            <Select
              value={currentExercise.categoryId}
              options={availableExercises.map((x) => {
                return {
                  ...x,
                  value: x.id,
                };
              })}
              onChange={handleChangeCategory}
            />
          </div>
          <div className={cn(styles["add-remove-exercise"])}>
            <button onClick={addNewSet} className={cn(styles["add"])}>
              <MdAdd />
            </button>
            <button
              onClick={() => removeExercise(currentExercise.id)}
              className={cn(styles["remove"])}
            >
              <MdDeleteForever />
            </button>
          </div>
        </div>
        <div className={cn(styles["sets-container"])}>
          <div className={cn(styles["sets-heading"])}>
            <span>Reps</span>
            <span>weight</span>
          </div>
          {(currentExercise?.sets &&
            currentExercise.sets.map((set: any) => {
              return (
                <div className={cn(styles["set"])} key={set.id}>
                  <div className={cn(styles["input-container"])}>
                    <Input
                      id={set.id}
                      type="number"
                      name="reps"
                      placeholder="reps"
                      value={set?.reps}
                      onChange={handleChangeSet}
                    />
                    <Input
                      id={set.id}
                      type="number"
                      name="weight"
                      placeholder="weight"
                      value={set.weight}
                      onChange={handleChangeSet}
                    />
                  </div>
                  <button onClick={() => handleDeleteSet(set.id)}>
                    <MdClose />
                  </button>
                </div>
              );
            })) ||
            null}
        </div>
      </div>
    </Card>
  );
};

export default Exercise;
