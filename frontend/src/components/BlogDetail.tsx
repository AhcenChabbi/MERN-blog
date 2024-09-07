import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Blog } from "../constants";
import { formatDate } from "../utils";
import { useAuth } from "../hooks/queries/useAuth";
import { MdCreate } from "react-icons/md";
import Highlight from "react-highlight";
const AuthorBlogs = lazy(() => import("./AuthorBlogs"));
import { useCallback, useEffect, useRef } from "react";
import { useLocalStorage, VISITED_BlOGS_KEY } from "../hooks/useLocalStorage";
import { motion } from "framer-motion";
import { useIncrementTotalVisit } from "../hooks/mutations/mutations";
import { variants } from "../constants/AnimationVariants";
import SEO from "./SEO";
import { BlogName } from "../constants/Schemas";
import { htmlToText } from "html-to-text";
import { useGetPageUrl } from "../hooks/useGetPageUrl";
import LikeAndBookmarkBlog from "./LikeAndBookmarkBlog";
import LoginSignUpModal from "./LoginOrSignUpModal";
import LoadingIndicator from "./LoadingIndicator";
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
  const userProfileRoute = isCurrentUserAuthor ? "/profile" : `/${username}`;
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
  const showModal = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);
  const currentLocation = useGetPageUrl();
  return (
    <>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-grow space-y-4 px-2.5"
      >
        <SEO
          title={`${title} | ${BlogName}`}
          description={htmlToText(content)}
          ogTitle={`${title} | ${BlogName}`}
          ogDescription={htmlToText(content)}
          ogType="article"
          ogImage={url}
          ogUrl={currentLocation}
          canonical={currentLocation}
        />
        <div className="flex flex-col gap-y-2.5">
          <img
            src={url}
            alt={title + "banner"}
            className="rounded-xl w-full max-h-80 object-cover"
            title={title}
            loading="lazy"
          />
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-x-2.5">
              <Link to={userProfileRoute} className="cursor-pointer">
                <img
                  className="rounded-full size-9 object-cover"
                  src={authorProfile}
                  alt="author profile"
                  title={username}
                  loading="lazy"
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

          <LikeAndBookmarkBlog
            blogId={blogId}
            showModal={showModal}
            totalBookmark={totalBookmark}
            totalReaction={totalReaction}
          />
        </div>
        <Suspense
          fallback={<LoadingIndicator message="Loading author's blogs" />}
        >
          <AuthorBlogs authorBlogs={authorBlogs} />
        </Suspense>
      </motion.div>
      <LoginSignUpModal dialogRef={dialogRef} />
    </>
  );
};

export default BlogDetail;
