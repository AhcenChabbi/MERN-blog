import { Blog } from "../constants";
import AuthorBlogCard from "./AuthorBlogCard";

const AuthorBlogs = ({ authorBlogs }: { authorBlogs: Blog[] }) => {
  return (
    authorBlogs.length > 0 && (
      <div className="pb-5">
        <h1 className="text-2xl font-semibold mb-3 dark:text-white text-darkBlue">
          Read next:
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {authorBlogs.map((authorBlog) => (
            <AuthorBlogCard key={authorBlog._id} {...authorBlog} />
          ))}
        </div>
      </div>
    )
  );
};

export default AuthorBlogs;
