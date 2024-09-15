import { AnimatePresence, motion } from "framer-motion";
import { GoSignOut } from "react-icons/go";
import { MdCreate } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { User } from "../constants";
import { FaRegBookmark } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { useLogout } from "../hooks/mutations/useLogout";
import useDropdown from "../hooks/useDropdown";
const navLinks = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    title: "Reading list",
    path: "/readinglist",
    icon: <FaRegBookmark />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <IoSettingsOutline />,
  },
];
const ProfileDropdown = ({ user }: { user: User }) => {
  const { closeDropdown, toggleIsOpen, dropdownRef, isOpen } = useDropdown();
  const { mutate: signOut } = useLogout();
  return (
    <div className="flex items-center gap-3 relative">
      <Link
        to="/createblog"
        className="flex items-center gap-1 px-3 py-1.5 rounded-3xl border dark:border-white border-darkBlue hover:bg-gray-100 transition-colors duration-200 dark:hover:bg-gray-800"
      >
        <MdCreate className="dark:text-white text-darkBlue " />
        <span className="dark:text-white text-darkBlue font-medium">Write</span>
      </Link>
      <div ref={dropdownRef}>
        <img
          onClick={toggleIsOpen}
          src={user.profile.url}
          alt="user profile"
          className="size-10 cursor-pointer border-2 border-darkBlue dark:border-blue-600 rounded-full object-cover"
          title={user.username}
          loading="lazy"
        />
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                duration: 0.5,
                type: "spring",
              }}
              className={`z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-md transition-opacity duration-200 w-44 dark:bg-gray-700 dark:divide-gray-600 overflow-hidden`}
            >
              <Link
                title={user.username}
                onClick={closeDropdown}
                to="/profile"
                className="px-4 py-3 text-sm text-gray-900 dark:text-white flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              >
                <img
                  src={user.profile.url}
                  alt="user profile"
                  className="size-10 cursor-pointer border-2 border-darkBlue dark:border-blue-600 rounded-full object-cover"
                  title={user.username}
                  loading="lazy"
                />
                <div className="font-medium text-ellipsis whitespace-nowrap overflow-hidden w-[11ch]">
                  {user.username}
                </div>
              </Link>

              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownUserAvatarButton"
              >
                {navLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      onClick={closeDropdown}
                      to={link.path}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items items-center gap-2 text-base "
                    >
                      {link.icon}
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="py-2">
                <div
                  onClick={() => {
                    signOut();
                    closeDropdown();
                  }}
                  className="flex items-center text-base gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                >
                  <GoSignOut />
                  Sign out
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfileDropdown;
