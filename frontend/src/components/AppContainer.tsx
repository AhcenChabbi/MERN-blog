import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuth } from "../hooks/queries/useAuth";

const AppContainer = () => {
  const { user, isLoading } = useAuth();
  return isLoading ? (
    <div className="flex-grow flex justify-center items-center">
      <Spinner size={10} />
    </div>
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/signin"
      replace={true}
      state={{
        redirectUrl: window.location.pathname,
      }}
    />
  );
};

export default AppContainer;
