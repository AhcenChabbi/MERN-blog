import { GrFormNext, GrFormPrevious } from "react-icons/gr";

type Props = {
  decrement: () => void;
  increment: () => void;
  isPlaceholderData: boolean;
  page: number;
  totalPages: number;
};
/* decrement: () => {
                  setPage((prev) => Math.max(prev - 1, 1));
                }
    increment: () => {
                  if (!isPlaceholderData && page < data.totalPages) {
                    setPage((prev) => prev + 1);
                  }
                }  */
const PaginationBar = ({
  increment,
  decrement,
  page,
  isPlaceholderData,
  totalPages,
}: Props) => {
  return (
    <div className="mx-auto w-full max-w-xs flex items-center justify-between bg-white border border-gray-200 rounded-full shadow dark:bg-gray-800 dark:border-gray-700 py-2.5 px-4 dark:text-white text-darkBlue text-base">
      <button
        disabled={page <= 1 || isPlaceholderData}
        onClick={decrement}
        className="dark:bg-gray-700 bg-gray-200 rounded-full p-2 flex items-center justify-center gap-x-1"
      >
        <GrFormPrevious className="size-6" />
      </button>
      <p className="dark:bg-gray-700 bg-gray-200 rounded-full py-2 px-3 flex items-center justify-center">
        {page} / {totalPages}
      </p>
      <button
        onClick={increment}
        disabled={isPlaceholderData || page >= totalPages}
        className="dark:bg-gray-700 bg-gray-200 rounded-full p-2 flex items-center justify-center gap-x-1"
      >
        <GrFormNext className="size-6" />
      </button>
    </div>
  );
};

export default PaginationBar;
