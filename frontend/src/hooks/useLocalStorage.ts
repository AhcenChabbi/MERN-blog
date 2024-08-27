import { useState } from "react";

export const VISITED_BlOGS_KEY = "visitedBlogs";

export function useLocalStorage<T = unknown>(key: string, defaultValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error reading from local storage:", error);
      return defaultValue;
    }
  });
  const setItem = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      console.error("Error setting item in local storage:", error);
    }
  };
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(defaultValue);
    } catch (error) {
      console.error("Error removing item from local storage:", error);
    }
  };
  return { setItem, storedValue, removeItem };
}
