import { useParams } from "react-router-dom";
import { useGetBlogById } from "../hooks/queries/useBlogs";
import { BlogDetail, LoadingIndicator } from "../components";
import { Suspense } from "react";

const Blog = () => {
  const { blogId } = useParams();
  const { data } = useGetBlogById(blogId || "");
  return (
    <div className="py-3 flex-grow flex mx-auto w-full max-w-3xl ">
      <Suspense fallback={<LoadingIndicator message="Loading Blog..." />}>
        <BlogDetail blog={data.blog} authorBlogs={data.authorBlogs} />
      </Suspense>
    </div>
  );
};

export default Blog;
