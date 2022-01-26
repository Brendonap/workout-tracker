import cn from "classnames";
import React, { useEffect, useState } from "react";
import { postCustomUserExercise } from "../../api";
import Button from "../../components/button";
import Card from "../../components/card";
import Input from "../../components/input";
import { useAppState } from "../../store";
import { UPDATE_SESSION } from "../../store/types";
import { AvailableExerciseType } from "../../types";
import { notify } from "../../utils";
import styles from "./manageExercises.module.scss";
import ShowAvailableExercises from "./showAvailableExercises";

const ManageAvailableExercises = () => {
  const { state, dispatch } = useAppState();
  const [newExerciseType, setNewExerciseType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<{
    saving: boolean;
    loadingCustomExercises: boolean;
  }>({ saving: false, loadingCustomExercises: false });

  const [availableExercises, setAvailableExercises] = useState<{
    default: AvailableExerciseType[];
    custom: AvailableExerciseType[];
  }>({ default: [], custom: [] });
  const handleOnChangeAddExerciseType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewExerciseType(event.target.value);
  };

  const handleSubmitNewExerciseType = async () => {
    if (!newExerciseType || isLoading.saving) return;
    try {
      setIsLoading((prev) => {
        return { ...prev, saving: true };
      });

      const newExerciseToBeSaved = {
        userId: state.uid,
        label: newExerciseType,
        type: newExerciseType,
        createdTimestamp: +new Date(),
      };

      const id = await postCustomUserExercise(newExerciseToBeSaved);

      // store new exercise in global state
      dispatch({
        type: UPDATE_SESSION,
        payload: {
          ...state,
          availableExercises: [
            ...(state.availableExercises || []),
            { id, ...newExerciseToBeSaved },
          ],
        },
      });

      notify("New Exercise Saved");
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading((prev) => {
        return { ...prev, saving: false };
      });
      setNewExerciseType("");
    }
  };

  const fetchCustomAvailableExercises = (
    exercises: AvailableExerciseType[]
  ) => {
    setAvailableExercises({
      default: exercises.filter((x) => !x.isCustom),
      custom: exercises.filter((x) => x.isCustom),
    });
  };

  useEffect(() => {
    if (!state?.availableExercises?.length) return;

    fetchCustomAvailableExercises(state.availableExercises);
  }, [state.availableExercises]);

  return (
    <div className={cn(styles.container)}>
      <Card classNames={cn(styles.card)}>
        <div className={cn(styles["add-new-container"])}>
          <Input
            {...{
              id: "add-new-exercise-type",
              name: "add-new-exercise-type",
              onChange: handleOnChangeAddExerciseType,
              placeholder: "Add new exercise type",
              value: newExerciseType,
              type: "text",
            }}
          />
          <Button onClick={handleSubmitNewExerciseType}>
            {(isLoading.saving && "Saving") || "Submit"}
          </Button>
        </div>
      </Card>

      {(availableExercises.custom.length && (
        <ShowAvailableExercises
          heading="Custom Exercises"
          availableExercises={availableExercises.custom}
        />
      )) ||
        null}
      {(availableExercises.default.length && (
        <ShowAvailableExercises
          heading="Default Exercises"
          availableExercises={availableExercises.default}
        />
      )) ||
        null}
    </div>
  );
};

export default ManageAvailableExercises;
