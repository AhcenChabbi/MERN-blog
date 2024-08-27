import { Link } from "react-router-dom";
import { Blog } from "../constants";
import { formatDate } from "../utils";
import { useAuth } from "../hooks/queries/useAuth";
import { MdCreate } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import Highlight from "react-highlight";
import { IoClose } from "react-icons/io5";
import AuthorBlogs from "./AuthorBlogs";
import { useEffect, useRef } from "react";
import { useLocalStorage, VISITED_BlOGS_KEY } from "../hooks/useLocalStorage";
import { motion } from "framer-motion";
import { BlogName } from "../constants/Schemas";
import {
  useBookmarkBlog,
  useIncrementTotalVisit,
  useLikeBlog,
} from "../hooks/mutations/mutations";
import { variants } from "../constants/AnimationVariants";
const BlogDetail = ({
  blog: {
    author: {
      username,
      profile: { url: authorProfile },
      //_id: userId,
    },
    banner: { url },
    title,
    createdAt,
    content,
    totalBookmark,
    totalReaction,
    _id: blogId,
  },
  authorBlogs,
}: {
  blog: Blog;
  authorBlogs: Blog[];
}) => {
  const { user } = useAuth();

  const isCurrentUserAuthor = user && user.username === username;
  const hasLiked = user && user.likedBlogs.includes(blogId);
  const hasBookmarked = user && user.bookmarkedBlogs.includes(blogId);
  const userProfileRoute = isCurrentUserAuthor ? "/profile" : `/${username}`;

  useEffect(() => {
    document.title = title + " | " + BlogName;
  }, [title]);

  const { mutate: likeBlogHandler } = useLikeBlog();

  const { mutate: bookMarkBlogHandler } = useBookmarkBlog();

  const { storedValue, setItem } = useLocalStorage<string[]>(
    VISITED_BlOGS_KEY,
    []
  );

  const { mutate: incrementTotalVisit } = useIncrementTotalVisit(
    (data: string) => {
      setItem([...storedValue, data]);
    }
  );

  useEffect(() => {
    if (!storedValue.includes(blogId)) {
      incrementTotalVisit(blogId);
    }
  }, [blogId, incrementTotalVisit, storedValue]);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const showModal = () => {
    dialogRef?.current?.showModal();
  };
  return (
    <>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-grow space-y-4 px-2.5"
      >
        <div className="flex flex-col gap-y-2.5">
          <img
            src={url}
            alt={title + "banner"}
            className="rounded-xl w-full max-h-80 object-cover"
          />
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-x-2.5">
              <Link to={userProfileRoute} className="cursor-pointer">
                <img
                  className="rounded-full size-9 object-cover"
                  src={authorProfile}
                  alt="author profile"
                />
              </Link>
              <div>
                <Link
                  to={userProfileRoute}
                  className="dark:text-blue-400 text-blue-600  hover:underline font-medium"
                >
                  {username}
                </Link>
                <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                  Posted on {formatDate(createdAt)}
                </p>
              </div>
            </div>
            {isCurrentUserAuthor && (
              <Link
                to="/createblog"
                state={{
                  defaultValues: { banner: url, title, content },
                  blogId,
                  isUpdatingState: true,
                }}
                className="flex items-center gap-1 px-4 py-1.5 rounded-3xl border dark:border-blue-400  border-darkBlue hover:bg-blue-50 dark:hover:bg-blue-50/10 transition-colors duration-300"
              >
                <MdCreate className="dark:text-blue-400 text-blue-600 " />
                <span className="dark:text-blue-400 text-blue-600 font-medium">
                  Edit
                </span>
              </Link>
            )}
          </div>
          <h1 className="text-xl dark:text-white text-darkBlue font-semibold">
            {title}
          </h1>

          <Highlight
            innerHTML={true}
            className="ProseMirror dark:text-white text-darkBlue"
          >
            {content}
          </Highlight>

          <div className="mx-auto w-full max-w-xs bg-white border border-gray-200 rounded-full shadow dark:bg-gray-800 dark:border-gray-700 py-2.5 flex items-center justify-center gap-x-3 mt-2.5 flex-wrap gap-y-2">
            <div className="flex items-center gap-2.5 dark:text-white text-darkBlue min-w-fit">
              <button
                onClick={() => {
                  if (user) {
                    likeBlogHandler(blogId);
                  } else {
                    showModal();
                  }
                }}
                className="dark:bg-gray-700 bg-gray-100 rounded-full p-2 flex items-center justify-center"
              >
                <FaHeart className={`${hasLiked && "text-red-600"}`} />
              </button>
              <span>{totalReaction} Reactions</span>
            </div>
            <div className="flex items-center gap-2.5 dark:text-white text-darkBlue min-w-fit">
              <button
                onClick={() => {
                  if (user) {
                    bookMarkBlogHandler(blogId);
                  } else {
                    showModal();
                  }
                }}
                className="dark:bg-gray-700 bg-gray-100 rounded-full p-2 flex items-center justify-center"
              >
                <IoBookmark
                  className={`${hasBookmarked && "text-purple-600"} `}
                />
              </button>
              <span>{totalBookmark} Bookmarks</span>
            </div>
          </div>
        </div>
        <AuthorBlogs authorBlogs={authorBlogs} />
      </motion.div>
      <Modal dialogRef={dialogRef} />
    </>
  );
};

const Modal = ({
  dialogRef,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>;
}) => {
  const closeModal = () => {
    dialogRef.current?.close();
  };
  return (
    <dialog
      ref={dialogRef}
      className="backdrop:backdrop-blur-sm bg-transparent p-0 transition-[opacity,transform] duration-300  -translate-y-20 opacity-0 block [&:not([open])]:pointer-events-none [&[open]]:translate-y-0 [&[open]]:opacity-100"
    >
      <div className="space-y-2.5 shadow bg-white dark:bg-gray-700 p-5 rounded-xl">
        <header className="flex items-center justify-between dark:text-white text-darkBlue">
          <h1 className="text-xl font-normal">Login to continue</h1>
          <button onClick={closeModal}>
            <IoClose className="text-2xl" />
          </button>
        </header>
        <p className="dark:text-white text-darkBlue text-base">
          We're a place where coders share, stay up-to-date and grow their
          careers.
        </p>
        <div className="w-full flex items-center justify-end gap-2 text-base font-medium">
          <Link
            state={{
              redirectUrl: window.location.pathname,
            }}
            to="/signin"
            className="dark:text-white text-blue-700"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-4 py-1.5 rounded-full dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Create account
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default BlogDetail;
