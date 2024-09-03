import { Link, useSearchParams } from "react-router-dom";
import { CenteredSpinner, ResetPasswordForm, SEO } from "../components";
import { Suspense } from "react";
import { MdError } from "react-icons/md";
import { error } from "../assets";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  const linkIsValid = code && exp && exp > now;
  return (
    <div className="flex justify-center items-center flex-grow">
      <SEO title="Reset Password" description="Reset Password" />
      {linkIsValid ? (
        <Suspense fallback={<CenteredSpinner />}>
          <ResetPasswordForm code={code} />
        </Suspense>
      ) : (
        <InvalidOrExpiredLink />
      )}
    </div>
  );
};
const InvalidOrExpiredLink = () => {
  return (
    <div className="space-y-3 p-5 dark:bg-gray-800 bg-white shadow rounded-xl border border-gray-200 dark:border-gray-700 ">
      <h1 className="text-2xl dark:text-white text-darkBlue font-semibold">
        Error
      </h1>
      <img src={error} alt="party" className="w-20 mx-auto" />
      <div className="flex items-center bg-red-300/40 dark:bg-red-300/20 gap-x-2 p-2 rounded-lg border border-red-300/75">
        <MdError className=" text-xl text-center text-red-900 dark:text-white" />
        <p className="text-red-900 dark:text-white">
          The link is either expired or invalid
        </p>
      </div>
      <Link className="link block text-center" to="/forgotpassword">
        Request new link
      </Link>
    </div>
  );
};

export default ResetPassword;
