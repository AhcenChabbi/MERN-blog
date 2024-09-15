import AuthorBlogCardSkeleton from "./AuthorBlogCardSkeleton";

const AuthorBlogsListSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2 flex-grow">
      {[...Array(3).keys()].map((i) => (
        <AuthorBlogCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default AuthorBlogsListSkeleton;
