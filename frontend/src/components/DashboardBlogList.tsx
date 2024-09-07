import { Blog } from "../constants";
import { Link } from "react-router-dom";
import DashboardBlogCard from "./DashboardBlogCard";
const DashboardBlogList = ({ blogs }: { blogs: Blog[] }) => {
  return blogs.length > 0 ? (
    <div className="space-y-2">
      <h1 className="dark:text-white text-darkBlue font-medium text-xl">
        Blogs:
      </h1>
      <div className="flex flex-col gap-y-2">
        {blogs.map((blog, index) => (
          <DashboardBlogCard key={blog._id} blog={blog} index={index} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center flex-grow flex-col">
      <h1 className="text-darkBlue dark:text-white font-medium text-lg">
        You haven't created any blog yet
      </h1>
      <Link to="/createblog" className="link">
        Create one
      </Link>
    </div>
  );
};

export default DashboardBlogList;
