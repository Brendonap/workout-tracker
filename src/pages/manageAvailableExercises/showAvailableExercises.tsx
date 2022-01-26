import { ShowAvailableExercisesPropType } from "../../types";
import cn from "classnames";
import styles from "./manageExercises.module.scss";
import Card from "../../components/card";

const ShowAvailableExercises = ({
  availableExercises,
  heading,
}: ShowAvailableExercisesPropType) => {
  return (
    <Card>
      <div>
        <h3>{heading}</h3>
        <div className={cn(styles["available-excersie-list"])}>
          {availableExercises.map((x) => {
            return (
              <div className={cn(styles["available-excersie-list-item"])}>
                <span>{x.label}</span>
                {/* <span>action</span> */}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default ShowAvailableExercises;
