import {
  doc,
  collection,
  query,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  where,
  Query,
} from "firebase/firestore";
import { database } from "../firestore";
import { loadState } from "../store";
import { TableNames } from "./types";

const getUserId = () => {
  return loadState().uid;
};

const _getResultsFromSnapShot = async (q: Query<any>) => {
  const querySnapshot = await getDocs(q);
  let results: any[] = [];

  querySnapshot.forEach((doc) => {
    results.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return results;
};

export const getAvailableExercises = async () => {
  const q = query(collection(database, TableNames.AVAILABLE_EXERCISES));
  return await _getResultsFromSnapShot(q);
};

export const getExercises = async () => {
  const q = query(
    collection(database, TableNames.EXERCISES),
    where("userId", "==", getUserId())
  );
  return await _getResultsFromSnapShot(q);
};

export const getExercisesByCategory = async (id: string) => {
  const q = query(
    collection(database, TableNames.EXERCISES),
    where("categoryId", "==", id),
    where("userId", "==", getUserId())
  );
  return await _getResultsFromSnapShot(q);
};

export const postExercise = async (defaultdata: { [key: string]: any }) => {
  const docRef = await addDoc(
    collection(database, TableNames.EXERCISES),
    defaultdata
  );

  return docRef.id;
};

export const putExercise = async (id: string, exercise: any) => {
  const docRef = doc(database, TableNames.EXERCISES, id);
  return await updateDoc(docRef, exercise);
};

export const deleteExercise = async (id: string) => {
  const docRef = doc(database, TableNames.EXERCISES, id);
  return await deleteDoc(docRef);
};

export const getProgressHistory = async (category: string) => {
  const q = query(
    collection(database, TableNames.TRACK_PROGRESS),
    where("category", "==", category),
    where("userId", "==", getUserId())
  );
  return await _getResultsFromSnapShot(q);
};

export const postTrackProgress = async (data: {
  category: string;
  value: string | number;
  createdTimestamp: number;
  userId: string;
}) => {
  const docRef = await addDoc(
    collection(database, TableNames.TRACK_PROGRESS),
    data
  );

  return docRef.id;
};

export const getCustomUserExercise = async () => {
  const q = query(
    collection(database, TableNames.CUSTOM_AVAILABLE_EXERCISES),
    where("userId", "==", getUserId())
  );
  return await _getResultsFromSnapShot(q);
};

export const postCustomUserExercise = async (data: {
  label: string;
  type: string;
  createdTimestamp: number;
  userId: string;
}) => {
  const docRef = await addDoc(
    collection(database, TableNames.CUSTOM_AVAILABLE_EXERCISES),
    data
  );

  return docRef.id;
};
