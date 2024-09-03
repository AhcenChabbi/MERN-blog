import { Blog } from "../constants";
import BlogCard from "./BlogCard";

type Props = {
  blogs: Blog[];
};
const BlogListGrid = ({ blogs }: Props) => {
  return (
    <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} {...blog} />
      ))}
    </div>
  );
};

export default BlogListGrid;
