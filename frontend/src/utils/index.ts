export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
export const convertBase64 = (file: File): Promise<string> => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    fileReader.onloadend = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = () => {
      reject(fileReader.error);
    };
  });
};

export const getModifiedData = <T extends object>(
  initial: T,
  current: T
): Partial<T> => {
  const modified: Partial<T> = {};
  (Object.keys(current) as (keyof T)[]).forEach((key) => {
    if (initial[key] !== current[key]) {
      modified[key] = current[key];
    }
  });
  return modified;
};

export const isEmptyObject = (obj: object) => {
  return Object.keys(obj).length === 0;
};
