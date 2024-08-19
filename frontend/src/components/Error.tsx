import { MdError } from "react-icons/md";

const Error = ({
  message = "An error occured please check your network or refresh the page",
}: {
  message?: string;
}) => {
  return (
    <div className="bg-red-50 dark:bg-gray-800 text-red-800 dark:text-red-400 border border-red-300 dark:border-red-800 text-lg gap-2 flex items-center justify-center rounded-lg p-2 max-w-fit flex-wrap text-center self-start mx-auto mt-2">
      <MdError className="text-2xl" />
      <p>{message}</p>
    </div>
  );
};

export default Error;
