import { AvailableExerciseType } from "../types";

export type TSystemState = {
  token?: string;
  uid: string;
  user: { [key: string]: any };
  availableExercises?: AvailableExerciseType[];
};

export type TContext = {
  state: TSystemState;
  dispatch: any;
};

// Describing the different ACTION NAMES available
export const UPDATE_SESSION = "UPDATE_SESSION";

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION;
  payload?: TSystemState;
}

export type SystemActionTypes = UpdateSessionAction;
