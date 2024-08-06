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
