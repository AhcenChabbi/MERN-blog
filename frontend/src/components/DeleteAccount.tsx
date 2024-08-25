import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useDeleteAccount } from "../hooks/mutations/mutations";
import Spinner from "./Spinner";
const DeleteAccount = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="dark:bg-gray-800 bg-white rounded-xl shadow p-4"
    >
      <h2 className="text-xl font-normal text-red-500">Delete Account</h2>
      <p className="dark:text-white text-darkBlue text-base font-normal my-3">
        Deleting your account will result in permanent deletion of your personal
        data. This action cannot be undone.
      </p>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className="text-red-900 bg-red-100 font-medium hover:bg-red-200 focus:ring-2 ring-offset-1 dark:ring-offset-gray-700 focus:ring-red-300 px-4 py-1.5 rounded-full dark:bg-red-200 dark:hover:bg-red-300 focus:outline-none dark:focus:ring-red-400 transition-all duration-300"
      >
        Delete your account
      </button>
      <Modal dialogRef={dialogRef} />
    </motion.div>
  );
};

const Modal = ({
  dialogRef,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>;
}) => {
  const closeModal = () => {
    dialogRef.current?.close();
  };
  const { mutate: deleteAccount, isPending } = useDeleteAccount();
  return (
    <dialog
      ref={dialogRef}
      className="backdrop:backdrop-blur-sm bg-transparent p-0 transition-[opacity,transform] duration-300 block inset-0 -translate-y-20 opacity-0 [&:not([open])]:pointer-events-none [&[open]]:translate-y-0 [&[open]]:opacity-100"
    >
      <div className="space-y-2.5 shadow bg-white dark:bg-gray-700 p-5 rounded-xl">
        <header className="flex items-center justify-between dark:text-white text-darkBlue">
          <h1 className="text-xl font-normal">Delete Account</h1>
          <button onClick={closeModal}>
            <IoClose className="text-2xl" />
          </button>
        </header>
        <p className="dark:text-white text-darkBlue text-base">
          Deleting your account will result in permanent deletion of your
          personal data. This action cannot be undone.
        </p>
        <div className="w-full flex items-center justify-end gap-2 text-base font-medium">
          <button
            onClick={closeModal}
            className="dark:text-white text-blue-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              deleteAccount();
              closeModal();
            }}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 px-4 py-1.5 rounded-full dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none flex items-center justify-center dark:focus:ring-red-800"
          >
            {isPending ? <Spinner /> : "Delete"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteAccount;
