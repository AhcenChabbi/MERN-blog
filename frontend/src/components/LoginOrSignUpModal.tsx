import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

type LoginSignUpModalProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
};
const LoginOrSignUpModal = ({ dialogRef }: LoginSignUpModalProps) => {
  const closeModal = () => {
    dialogRef.current?.close();
  };
  return (
    <dialog
      ref={dialogRef}
      className="backdrop:backdrop-blur-sm bg-transparent p-0 transition-[opacity,transform] duration-300  -translate-y-20 opacity-0 block [&:not([open])]:pointer-events-none [&[open]]:translate-y-0 [&[open]]:opacity-100"
    >
      <div className="space-y-2.5 shadow bg-white dark:bg-gray-700 p-5 rounded-xl">
        <header className="flex items-center justify-between dark:text-white text-darkBlue">
          <h2 className="text-xl font-normal">Login to continue</h2>
          <button onClick={closeModal}>
            <IoClose className="text-2xl" />
          </button>
        </header>
        <p className="dark:text-white text-darkBlue text-base">
          We're a place where coders share, stay up-to-date and grow their
          careers.
        </p>
        <div className="w-full flex items-center justify-end gap-2 text-base font-medium">
          <Link
            state={{
              redirectUrl: window.location.pathname,
            }}
            to="/signin"
            className="dark:text-white text-blue-700"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-4 py-1.5 rounded-full dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Create account
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default LoginOrSignUpModal;
