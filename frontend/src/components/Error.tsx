import { MdError } from "react-icons/md";
import { error } from "../assets";

const Error = ({
  message = "An error occured please check your network or refresh the page",
}: {
  message?: string;
}) => {
  return (
    <div className="space-y-3 p-5 dark:bg-gray-800 bg-white shadow rounded-xl border border-gray-200 dark:border-gray-700 self-center mx-auto">
      <h1 className="text-2xl dark:text-white text-darkBlue font-semibold">
        Error
      </h1>
      <img src={error} alt="party" className="w-20 mx-auto" />
      <div className="flex items-center bg-red-300/40 dark:bg-red-300/20 gap-x-2 p-2 rounded-lg border border-red-300/75">
        <MdError className=" text-xl text-center text-red-900 dark:text-white" />
        <p className="text-red-900 dark:text-white max-w-64 text-center">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Error;
