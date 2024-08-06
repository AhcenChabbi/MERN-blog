import { useParams } from "react-router-dom";
import { useGetBlogById } from "../hooks/queries/useBlogs";
import { BlogDetail, Spinner } from "../components";
import { MdError } from "react-icons/md";

const Blog = () => {
  const { blogId } = useParams();
  const { data, isPending, isError, isSuccess, error } = useGetBlogById(
    blogId || ""
  );

  return (
    <div className="py-5">
      {isPending ? (
        <div className="flex justify-center items-center">
          <Spinner size={10} />
        </div>
      ) : isError ? (
        <div className="bg-red-50 dark:bg-gray-800 text-red-800 dark:text-red-400 border border-red-300 dark:border-red-800 text-lg gap-2 flex items-center justify-center rounded-lg p-2 max-w-fit flex-wrap text-center mx-auto">
          <MdError className="text-2xl" />
          <p>
            {error.message ||
              "An error occured please check your network or refresh the page"}
          </p>
        </div>
      ) : (
        isSuccess &&
        data && <BlogDetail blog={data.blog} authorBlogs={data.authorBlogs} />
      )}
    </div>
  );
};

export default Blog;
