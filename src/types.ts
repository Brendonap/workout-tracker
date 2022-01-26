import React from "react";

export type ExercisePropTypes = {
  availableExercises: AvailableExerciseType[];
  exercise: ExerciseType;
  removeExercise: (id: string) => void;
};

export type ExerciseType = {
  id: string;
  categoryId: string;
  sets: SetType[];
  createdDate: string;
  createdTimestamp: number;
  userId: string;
};

export type SetType = {
  id: string;
  reps: number;
  weight: number;
};

type DefaultExerciseType = {
  id: string;
  label: string;
  type: string;
  category?: string;
};

type CustomExerciseType = {
  isCustom?: boolean;
  userId?: string;
  createdTimestamp?: number;
};

export type AvailableExerciseType = DefaultExerciseType & CustomExerciseType;

export type SelectType = {
  value: any;
  options: OptionType[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
};

export type ButtonType = {
  onClick: any;
  label?: string;
  children?: React.ReactNode;
};

export type OptionType = {
  id: string;
  label: string;
  value: string | number;
};

export type InputType = {
  id: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  placeholder?: string;
};

export type CardPropTypes = {
  classNames?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
};

export type HistoryChartsPropType = {
  chartData: HistoryChartDataType;
};

export type HistoryChartDataType = {
  volume: any[];
  scatter: any[];
};

export type LineChartDataType = {
  name: string;
  [key: string]: any;
};

export type CustomLineChartPropTypes = {
  data: LineChartDataType[];
  lines: string[];
};

export type CustomScatterChartPropType = {
  data: CustomScatterChartDataType[];
};

export type CustomScatterChartDataType = {
  x: number;
  y: number;
  z?: number;
};

export type TrackHistoryDataType = {
  id: string;
  category: string;
  createdTimestamp: number;
  value: number;
};

export type ShowAvailableExercisesPropType = {
  availableExercises: AvailableExerciseType[];
  heading: string;
};
