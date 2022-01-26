import React, { createContext, useContext } from "react";
import { useReducer } from "react";
import { appReducer } from "./reducer";
import { TContext, TSystemState } from "./types";

export enum LocalStorageType {
  STATE_KEY = "my-fitness",
}

const loadState = (key: string = LocalStorageType.STATE_KEY) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const clearState = (key: string = LocalStorageType.STATE_KEY) => {
  try {
    localStorage.removeItem(key);
    return null;
  } catch (e) {
    return undefined;
  }
};

const saveState = (state: TSystemState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LocalStorageType.STATE_KEY, serializedState);
  } catch (e) {
    return undefined;
  }
};

const peristedState = loadState(LocalStorageType.STATE_KEY);
const initialAppState = {
  token: "",
  uid: "",
  ...peristedState,
};

const Context = createContext<TContext>({
  state: initialAppState,
  dispatch: () => {},
});

const AppStateProvider = ({
  reducer,
  initialState = initialAppState,
  children,
}: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch } as TContext}>
      {children}
    </Context.Provider>
  );
};

const useAppState = () => {
  return useContext(Context);
};

export {
  AppStateProvider,
  appReducer,
  useAppState,
  loadState,
  clearState,
  saveState,
};
