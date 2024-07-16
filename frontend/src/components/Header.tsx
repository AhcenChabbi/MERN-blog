import { Link, NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { navLinks } from "../constants/constants";
import { FaMoon } from "react-icons/fa6";
import { useAppDispatch, useAppSelectore } from "../app/hooks";
import { FaSun } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { toggleTheme } from "../app/themeSlice";
const Header = () => {
  const { theme } = useAppSelectore((state) => state.theme);
  const dispatch = useAppDispatch();
  return (
    <nav className="flex items-center justify-between px-6 lg:px-10 py-3 border-b border-b-darkGrey dark:border-b-lightGrey">
      <Link
        className="text-xl sm:text-2xl lg:text-3xl text-darkBlue font-semibold dark:text-whiteSmoke"
        to="/"
      >
        DevLog
      </Link>

      <div className="relative hidden lg:block">
        <input
          type="text"
          className="bg-gray-200 outline-none focus:dark:border-lightBlueSky focus:border-blueSky transition-all duration-200 border-2 border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-whiteSmoke"
          placeholder="Search"
          required
        />
      </div>

      <Link
        to="/search"
        className="border lg:hidden dark:border-lightGrey border-darkGrey rounded-2xl px-3 py-1.5"
      >
        <IoSearch className="text-darkBlue dark:text-whiteSmoke  text-2xl" />
      </Link>

      <div className="hidden lg:flex items-center gap-5">
        {navLinks.map((link) => (
          <NavLink
            key={link.title}
            className={({ isActive }) =>
              `${
                isActive
                  ? "dark:text-lightBlueSky text-blueSky"
                  : "dark:text-whiteSmoke text-darkBlue"
              } text-lg font-medium`
            }
            to={link.path}
          >
            {link.title}
          </NavLink>
        ))}
      </div>
      <button
        className="hidden sm:block border dark:border-lightGrey border-darkGrey rounded-2xl px-4 py-2 hover:dark:bg-darkGrey hover:bg-lightGrey transition-colors duration-300"
        onClick={() => {
          dispatch(toggleTheme());
        }}
      >
        {theme === "dark" ? (
          <FaSun className="dark:text-whiteSmoke  text-darkBlue text-xl" />
        ) : (
          <FaMoon className="dark:text-whiteSmoke  text-darkBlue text-xl" />
        )}
      </button>
      <Link
        className="text-lg font-medium dark:text-whiteSmoke text-darkBlue"
        to="/signin"
      >
        Sign in
      </Link>
      <IoMenu className="text-3xl dark:text-whiteSmoke text-darkBlue lg:hidden" />
    </nav>
  );
};

export default Header;
