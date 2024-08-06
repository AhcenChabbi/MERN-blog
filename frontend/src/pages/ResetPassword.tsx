import { Link, useSearchParams } from "react-router-dom";
import { MdError } from "react-icons/md";
import { ResetPasswordForm } from "../components";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  const linkIsValid = code && exp && exp > now;
  return (
    <div className="flex justify-center items-center flex-grow">
      {linkIsValid ? (
        <ResetPasswordForm code={code} />
      ) : (
        <div className="bg-red-50 dark:bg-gray-800 text-red-800 dark:text-red-400 border border-red-300 dark:border-red-800 text-lg flex flex-col items-center justify-center min-w-40 rounded-lg p-2">
          <div className="flex items-center justify-center gap-2">
            <MdError className="text-2xl" />
            <p>Invalid link</p>
          </div>
          <div>
            <p>The link is either invalid or expired</p>
            <Link
              to="/forgotpassword"
              className="hover:underline text-blue-600"
            >
              Request a new password reset link
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
