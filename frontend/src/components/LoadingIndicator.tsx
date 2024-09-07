const LoadingIndicator = ({ message = "Loading..." }: { message: string }) => {
  return (
    <div className="flex items-center justify-center flex-grow">
      <div className="px-3 py-1.5 text-sm font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
        {message}
      </div>
    </div>
  );
};

export default LoadingIndicator;
