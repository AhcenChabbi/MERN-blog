import { Blog } from "../constants";
import AuthorBlogCard from "./AuthorBlogCard";
type ReadingListBlogsProps = {
  blogs: Blog[];
};
const ReadingListBlogs = ({ blogs }: ReadingListBlogsProps) => {
  return (
    <div className="flex flex-col gap-y-3">
      {blogs.map((blog) => (
        <AuthorBlogCard key={blog._id} {...blog} />
      ))}
    </div>
  );
};

export default ReadingListBlogs;
