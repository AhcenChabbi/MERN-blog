import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../lib/api";
import { FaCheckCircle } from "react-icons/fa";
import { SEO, Spinner } from "../components";
import { useAuth } from "../hooks/queries/useAuth";
import { error, partyPopper } from "../assets";
import { MdError } from "react-icons/md";

const EmailVerification = () => {
  const { code } = useParams();
  const { isLoading, isError } = useQuery({
    queryFn: () => verifyEmail(code || ""),
    queryKey: ["emailVerification", code],
  });
  const { user } = useAuth();
  return (
    <div className="flex-grow flex justify-center items-center">
      <SEO title="Email Verification" description="Email Verification" />
      {isLoading ? (
        <Spinner size={10} />
      ) : (
        <div className="space-y-3 p-5 dark:bg-gray-800 bg-white shadow rounded-xl border border-gray-200 dark:border-gray-700 ">
          {isError ? (
            <>
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
            </>
          ) : (
            <>
              <h1 className="text-2xl dark:text-white text-darkBlue font-semibold">
                Done!
              </h1>
              <img src={partyPopper} alt="party" className="w-32 mx-auto" />
              <div className="flex items-center bg-green-300/40 dark:bg-green-300/20 gap-x-2 p-2 rounded-lg">
                <FaCheckCircle className=" text-xl text-center text-green-900 dark:text-white" />
                <p className="text-green-900 dark:text-white">
                  Success! Your email has been verified
                </p>
              </div>
              <Link
                className="flex justify-center items-center bg-green-500/75 p-3 rounded-lg text-white hover:bg-green-500/60 font-medium transition-colors duration-300"
                to={user ? "/" : "/signin"}
              >
                {user ? "Back to home" : "Sign in"}
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
