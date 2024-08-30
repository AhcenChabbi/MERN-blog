import { useParams } from "react-router-dom";
import { useGetBlogById } from "../hooks/queries/useBlogs";
import { BlogDetail, CenteredSpinner, Error } from "../components";
import { Suspense } from "react";

const Blog = () => {
  const { blogId } = useParams();
  const { data, isPending, isError, error } = useGetBlogById(blogId || "");

  return (
    <div className="pt-5 flex-grow flex mx-auto w-full max-w-3xl ">
      {isPending ? (
        <CenteredSpinner />
      ) : isError ? (
        <Error message={error.message} />
      ) : (
        <Suspense fallback={<CenteredSpinner />}>
          <BlogDetail blog={data.blog} authorBlogs={data.authorBlogs} />
        </Suspense>
      )}
    </div>
  );
};

export default Blog;
