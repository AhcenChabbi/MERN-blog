import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../lib/api";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { Spinner } from "../components";
const EmailVerification = () => {
  const { code } = useParams();
  const { isLoading, isError, isSuccess } = useQuery({
    queryFn: () => verifyEmail(code || ""),
    queryKey: ["emailVerification", code],
  });
  return (
    <div className="flex-grow flex items-start mt-5 justify-center">
      {isLoading ? (
        <Spinner size={10} />
      ) : (
        <div
          className={` ${
            isSuccess
              ? "p-4 text-lg text-green-800 border border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
              : "bg-red-50 dark:bg-gray-800 text-red-800 dark:text-red-400 border border-red-300 dark:border-red-800 text-lg"
          } flex flex-col items-center justify-center min-w-40 rounded-lg p-2`}
        >
          {isSuccess ? (
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-2xl" />
              <p>Email verified</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <MdError className="text-2xl" />
                {isError && <p>Invalid link</p>}
              </div>
              {isError ? (
                <div className="flex flex-col items-center">
                  <p>The link is either invalid or expired</p>
                  <Link
                    to="/forgotpassword"
                    className="hover:underline text-blue-600"
                  >
                    Get new link
                  </Link>
                </div>
              ) : (
                <p>Something went wrong please try again</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
