import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/queries/useAuth";
import Spinner from "./Spinner";

const AuthRedirect = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex-grow flex justify-center items-center">
        <Spinner size={10} />
      </div>
    );
  }
  if (user) {
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet />;
};

export default AuthRedirect;
