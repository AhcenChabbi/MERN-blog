import { MdError } from "react-icons/md";

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <div
        role="alert"
        className="p-5 dark:bg-gray-800 bg-white shadow rounded-xl border border-gray-200 dark:border-gray-700 space-y-2.5"
      >
        <div className="flex items-center bg-red-300/40 dark:bg-red-300/20 gap-x-2 p-2 rounded-lg border border-red-300/75">
          <MdError className=" text-xl text-center text-red-900 dark:text-white" />
          <p className="text-red-900 dark:text-white max-w-64 text-center">
            Something went wrong!.
          </p>
        </div>
        <button
          className="block mx-auto bg-red-700/75 hover:bg-red-700/100 dark:bg-red-700/50 dark:hover:bg-red-700/75 text-white font-semibold py-2 px-4 rounded tracking-wider"
          onClick={resetErrorBoundary}
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
