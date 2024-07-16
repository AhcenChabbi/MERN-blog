import { ReactNode } from "react";
import { useAppSelectore } from "../app/hooks";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useAppSelectore((state) => state.theme);
  return (
    <div className={`${theme}`}>
      <div className={`min-h-screen dark:bg-darkBlue bg-whiteSmoke`}>
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
