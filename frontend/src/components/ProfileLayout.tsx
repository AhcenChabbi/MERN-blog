import { Suspense } from "react";
import { CenteredSpinner, SEO, UserBlogList, UserDetail } from ".";
import { userAndUserBlogs } from "../lib/api";

const ProfileLayout = ({ user, blogs }: userAndUserBlogs) => {
  return (
    <>
      <SEO title={user.username} description={user.username + "'s profile"} />
      <Suspense fallback={<CenteredSpinner />}>
        <UserDetail user={user} />
        <UserBlogList blogs={blogs} user={user} />
      </Suspense>
    </>
  );
};

export default ProfileLayout;
