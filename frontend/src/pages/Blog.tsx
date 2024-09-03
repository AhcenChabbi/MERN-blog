import { useParams } from "react-router-dom";
import { useGetBlogById } from "../hooks/queries/useBlogs";
import { BlogDetail, CenteredSpinner, Error } from "../components";

const Blog = () => {
  const { blogId } = useParams();
  const { data, isPending, isError, error } = useGetBlogById(blogId || "");

  return (
    <div className="py-3 flex-grow flex mx-auto w-full max-w-3xl ">
      {isPending ? (
        <CenteredSpinner />
      ) : isError ? (
        <Error message={error.message} />
      ) : (
        <BlogDetail blog={data.blog} authorBlogs={data.authorBlogs} />
      )}
    </div>
  );
};

export default Blog;
