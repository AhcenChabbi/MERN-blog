import { NavigateFunction } from "react-router-dom";

export let navigate: NavigateFunction;
export const setNabigate = (fn: NavigateFunction) => {
  navigate = fn;
};
