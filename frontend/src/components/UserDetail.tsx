import { FaRegNewspaper } from "react-icons/fa6";
import { User } from "../constants";
import { FaCalendarAlt } from "react-icons/fa";
import { formatDate } from "../utils";
import { Link, useLocation } from "react-router-dom";
import { MdCreate } from "react-icons/md";
import { motion } from "framer-motion";
const UserDetail = ({
  user,
}: {
  user: Pick<
    User,
    "username" | "bio" | "profile" | "createdAt" | "blogPublished" | "_id"
  >;
}) => {
  const location = useLocation();
  const isEditProfileHidden = location.pathname !== "/profile";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="flex flex-col sm:flex-row justify-between w-full border-b dark:border-gray-300 border-gray-700 py-5 gap-y-4"
    >
      <div className=" flex flex-col sm:flex-row gap-y-4 items-center gap-x-4">
        <img
          className="rounded-full object-cover size-28"
          src={user.profile.url}
          alt="user profile"
        />
        <div className="flex flex-col justify-center items-center sm:items-start gap-y-3">
          <h1 className="text-2xl dark:text-white text-darkBlue font-medium">
            {user.username}
          </h1>
          <p className="text-base dark:text-gray-400 text-gray-700">
            {user.bio ? user.bio : "No bio"}
          </p>
          <div className="flex flex-col sm:flex-row gap-y-1 sm:items-center gap-x-3 dark:text-gray-400 text-gray-700">
            <div className="flex items-center gap-x-2">
              <FaCalendarAlt />
              <p>Member since {formatDate(user.createdAt)}</p>
            </div>
            <div className="flex items-center gap-x-2">
              <FaRegNewspaper />
              <p> {user.blogPublished} blog published</p>
            </div>
          </div>
        </div>
      </div>
      <Link
        className={`btn text-nowrap self-center sm:self-start px-3 py-1.5 rounded-3xl text-base font-medium gap-x-2 w-fit ${
          isEditProfileHidden ? "hidden" : ""
        }`}
        to="/settings"
      >
        <MdCreate />
        Edit profile
      </Link>
    </motion.div>
  );
};

export default UserDetail;
