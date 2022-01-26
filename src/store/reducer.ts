import { saveState } from ".";
import { SystemActionTypes, TSystemState, UPDATE_SESSION } from "./types";

export function appReducer(
  state: TSystemState,
  action: SystemActionTypes
): TSystemState {
  switch (action.type) {
    case UPDATE_SESSION: {
      saveState({ ...state, ...action.payload } as TSystemState);
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
