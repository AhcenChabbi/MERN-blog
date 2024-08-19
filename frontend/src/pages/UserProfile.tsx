import { useParams } from "react-router-dom";
import { useGetUserAndUserBlogs } from "../hooks/queries/useBlogs";
import { AuthorBlogCard, Error, Spinner, UserDetail } from "../components";
import { useEffect } from "react";

const UserProfile = () => {
  const { username } = useParams();
  const { data, isPending, isError } = useGetUserAndUserBlogs(username || "");
  useEffect(() => {
    if (data) {
      document.title = data.user.username;
    } else {
      document.title = "User not found";
    }
  }, [data]);
  return (
    <div className="w-full max-w-2xl mx-auto px-3 flex-grow flex flex-col gap-y-2">
      {isPending ? (
        <div className="flex items-center justify-center flex-grow">
          <Spinner size={10} />
        </div>
      ) : isError ? (
        <Error message="User not found" />
      ) : (
        <>
          <UserDetail user={data.user} />
          {data.blogs.length > 0 ? (
            <div className="flex flex-col gap-y-2 flex-grow">
              <h1 className="dark:text-white text-darkBlue font-medium text-xl">
                {data.user.username}'s blogs:
              </h1>
              <div className="flex flex-col gap-y-2 flex-grow">
                {data.blogs.map((blog) => (
                  <AuthorBlogCard key={blog._id} {...blog} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-y-1 items-center justify-center flex-grow">
              <h1 className="dark:text-white text-darkBlue font-medium text-lg">
                {data.user.username} hasn't created any blog yet
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfile;
