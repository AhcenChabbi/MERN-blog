import { useState } from "react";
import { MdCreate } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa6";
import { GoSignOut } from "react-icons/go";
import { useAuth } from "../hooks/queries/useAuth";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../lib/api";
import toast from "react-hot-toast";
import queryClient from "../config/queryClient";
import { User } from "../constants";
const navLinks = [
  {
    title: "Dashboard",
    path: "/",
    icon: <MdOutlineDashboard />,
  },
  {
    title: "Reading list",
    path: "/",
    icon: <FaRegBookmark />,
  },
  {
    title: "Settings",
    path: "/",
    icon: <IoSettingsOutline />,
  },
];
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const { user } = useAuth() as { user: User };
  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      toast.success("Logout successful");
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });
  return (
    <div className="flex items-center gap-3 relative">
      <Link
        to="/createblog"
        className="flex items-center gap-1 px-3 py-1.5 rounded-3xl border dark:border-white border-darkBlue hover:bg-gray-100 transition-colors duration-200 dark:hover:bg-gray-800"
      >
        <MdCreate className="dark:text-white text-darkBlue " />
        <span className="dark:text-white text-darkBlue font-medium">Write</span>
      </Link>
      <div>
        <img
          onClick={toggleIsOpen}
          src={user.profile.url}
          alt="user profile"
          className="size-10 cursor-pointer border-2 border-darkBlue dark:border-blue-600 rounded-full"
        />
        <div
          className={`z-10 absolute ${
            !isOpen
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          }  right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-md transition-opacity duration-200 w-44 dark:bg-gray-700 dark:divide-gray-600 overflow-hidden`}
        >
          <Link
            to="/profile"
            className="px-4 py-3 text-sm text-gray-900 dark:text-white flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          >
            <img
              src={user.profile.url}
              alt="user profile"
              className="size-10 cursor-pointer border-2 border-darkBlue dark:border-blue-600 rounded-full"
            />
            <div className="font-medium">@{user.username}</div>
          </Link>

          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUserAvatarButton"
          >
            {navLinks.map((link) => (
              <li key={link.title}>
                <Link
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
              }}
              className="flex items-center text-base gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
            >
              <GoSignOut />
              Sign out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
