import { Link } from "react-router-dom";
import { BlogName } from "../constants/constants";
import { FaMoon } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FaSun } from "react-icons/fa";
import { toggleTheme } from "../app/themeSlice";
import Profile from "./Profile";
import Spinner from "./Spinner";
import { useAuth } from "../hooks/queries/useAuth";

const Header = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAuth();
  return (
    <nav className="flex items-center justify-between py-3 border-b border-b-gray-500 dark:border-b-gray-300 px-6 lg:px-12">
      <Link
        className="text-xl sm:text-2xl lg:text-3xl text-darkBlue font-bold dark:text-white"
        to="/"
      >
        {BlogName}
      </Link>
      <div className="flex items-center gap-3">
        <button
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
        </button>
        {isLoading ? (
          <Spinner />
        ) : user ? (
          <Profile />
        ) : (
          <>
            <Link
              className="py-1.5  dark:text-white text-darkBlue px-3 font-medium"
              to="/signin"
            >
              Sign in
            </Link>
            <Link
              className="py-1.5  dark:text-darkBlue dark:bg-white bg-darkBlue  text-white border rounded-lg px-3 transition-colors duration-300  font-medium hover:bg-transparent hover:text-darkBlue hover:border-darkBlue dark:hover:border-white dark:hover:bg-transparent dark:hover:text-white"
              to="/signup"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
