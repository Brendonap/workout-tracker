import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export const getNewSet = () => {
  return {
    id: uuidv4(),
    reps: 0,
    weight: 0,
  };
};

export const groupBy = (items: any[], key: string) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );

export function sortObject(items: { [key: string]: any }) {
  return Object.keys(items)
    .sort((a: any, b: any) => {
      return a > b ? -1 : 1;
    })
    .reduce((result: any, key: string) => {
      result[key] = items[key];
      return result;
    }, {});
}

export const dateToLocalString = (date: string | number | Date) => {
  return new Date(date).toLocaleDateString();
};

export const notify = (message: string) =>
  toast(message, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
