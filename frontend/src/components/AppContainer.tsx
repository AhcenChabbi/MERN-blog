import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuth } from "../hooks/queries/useAuth";

const AppContainer = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex-grow flex justify-center items-center">
        <Spinner size={10} />
      </div>
    );
  }
  if (!user) {
    return (
      <Navigate
        to="/signin"
        replace={true}
        state={{
          redirectUrl: window.location.pathname,
        }}
      />
    );
  }
  return <Outlet />;
};

export default AppContainer;
