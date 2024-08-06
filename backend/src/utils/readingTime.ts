const AVG_READ_WPM = 200;
export const getReadingTime = (content: string) => {
  return Math.ceil(content.split(" ").length / AVG_READ_WPM);
};
