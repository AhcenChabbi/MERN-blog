import { SEO, UserBlogList, UserDetail } from ".";
import { userAndUserBlogs } from "../lib/api";
import { useGetPageUrl } from "../hooks/useGetPageUrl";

const ProfileLayout = ({ user, blogs }: userAndUserBlogs) => {
  const currentLocation = useGetPageUrl();
  return (
    <>
      <SEO
        title={user.username}
        description={user.username + "'s profile"}
        ogImage={user.profile.url}
        ogType="profile"
        ogTitle={user.username}
        ogDescription={user.username + "'s profile"}
        ogUrl={currentLocation}
        canonical={currentLocation}
        author={user.username}
        keywords={user.username}
      />
      <UserDetail user={user} />
      <UserBlogList blogs={blogs} user={user} />
    </>
  );
};

export default ProfileLayout;
