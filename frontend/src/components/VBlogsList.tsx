import { Blog } from "../constants";
import AuthorBlogCard from "./AuthorBlogCard";

const VBlogsList = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className="flex flex-col gap-y-2 flex-grow">
      {blogs.map((blog) => (
        <AuthorBlogCard key={blog._id} {...blog} />
      ))}
    </div>
  );
};

export default VBlogsList;
