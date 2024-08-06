import { ReactNode } from "react";
import { useAppSelector } from "../app/hooks";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useAppSelector((state) => state.theme);
  return (
    <div
      className={`${theme} ${theme === "dark" ? "bg-darkBlue" : "bg:white"}`}
    >
      <div
        className={`min-h-screen flex flex-col dark:bg-darkBlue bg-white 2xl:container 2xl:mx-auto`}
      >
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
