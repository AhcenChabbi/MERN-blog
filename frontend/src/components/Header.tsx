import { Link } from "react-router-dom";
import { BlogName } from "../constants/Schemas";
import { FaMoon } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FaSun } from "react-icons/fa";
import { toggleTheme } from "../app/themeSlice";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  return (
    <nav className="flex items-center justify-between py-3 border-b border-b-gray-500 dark:border-b-gray-300 px-6 lg:px-12">
      <Link
        className="text-2xl lg:text-3xl text-darkBlue font-bold dark:text-white"
        to="/"
      >
        {BlogName}
      </Link>
      <div className="flex items-center gap-3">
        <button
          role="button"
          name="theme"
          className="rounded-lg p-3 dark:hover:bg-gray-800 hover:bg-gray-200 transition-colors duration-300"
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          {theme === "dark" ? (
            <FaSun className="dark:text-white  text-darkBlue text-lg" />
          ) : (
            <FaMoon className="dark:text-white  text-darkBlue text-lg" />
          )}
          <span className="sr-only"> Toggle Theme</span>
        </button>
        <ProfileDropdown />
      </div>
    </nav>
  );
};

export default Header;
