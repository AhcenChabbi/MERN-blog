export const VISITED_BlOGS_KEY = "visitedBlogs";

export function useLocalStorage<T = unknown>(key: string, defaultValue: T) {
  const getItem = (): T => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error("Error reading from local storage:", error);
      return defaultValue;
    }
  };
  const setItem = (value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item in local storage:", error);
    }
  };
  return { setItem, getItem };
}
