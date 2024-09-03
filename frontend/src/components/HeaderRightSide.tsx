import { useAuth } from "../hooks/queries/useAuth";
import Spinner from "./Spinner";
import ProfileDropdown from "./ProfileDropdown";
import LoginSignupLinks from "./LoginSignupLinks";
const HeaderRightSide = () => {
  const { user, isLoading } = useAuth();
  return isLoading ? (
    <Spinner />
  ) : user ? (
    <ProfileDropdown user={user} />
  ) : (
    <LoginSignupLinks />
  );
};
export default HeaderRightSide;
