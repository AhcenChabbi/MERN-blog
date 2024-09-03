import { Link } from "react-router-dom";

const EmptyReadingList = () => {
  return (
    <div className="w-full flex flex-col gap-y-2 text-center">
      <p className="text-2xl font-semibold dark:text-white text-darkBlue">
        Reading List is empty
      </p>
      <Link to="/" className="link">
        Back to home
      </Link>
    </div>
  );
};

export default EmptyReadingList;
