import { useRef } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { motion, Variants } from "framer-motion";
import { z } from "zod";
import { UpdateUserSchema } from "../constants/Schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertBase64, getModifiedData, isEmptyObject } from "../utils";
import { FaRegTrashCan } from "react-icons/fa6";
import { useAuth } from "../hooks/queries/useAuth";
import { User } from "../constants";
import toast from "react-hot-toast";
import { useUpdateUser } from "../hooks/mutations/mutations";
import Spinner from "./Spinner";
type FormFields = z.infer<typeof UpdateUserSchema>;
const variants: Variants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.5, type: "spring", stiffness: 100 },
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 100 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "spring", stiffness: 100 },
  },
};
const BasicInfo = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    user: {
      profile: { url },
      username,
      email,
      bio,
    },
  } = useAuth() as { user: User };
  const defaultValues = {
    profile: url,
    username,
    email,
    bio,
  };
  const {
    register,
    handleSubmit,
    // formState: { errors },
    setValue,
    watch,
  } = useForm<FormFields>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  });
  const { mutate: updateUser, isPending } = useUpdateUser();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const modifiedData = getModifiedData(defaultValues, data);
    if (isEmptyObject(modifiedData)) {
      toast.error("No changes made");
    } else {
      updateUser(modifiedData);
    }
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = await convertBase64(file);
      setValue("profile", fileUrl, { shouldValidate: true });
    }
  };
  const handleDeleteImage = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setValue("profile", "", { shouldValidate: true });
  };
  const profile = watch("profile");
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="dark:bg-gray-800 bg-white rounded-xl shadow p-4"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
        <div className="flex items-center justify-between ">
          <h2 className="text-xl font-normal dark:text-white text-darkBlue">
            Basic Info
          </h2>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-4 py-1.5 rounded-full dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center focus:outline-none dark:focus:ring-blue-800"
          >
            {isPending ? <Spinner /> : "Save Changes"}
          </button>
        </div>

        <div className="space-y-2">
          <label className="dark:text-white text-darkBlue text-base">
            Profile picture
          </label>
          <div>
            <input
              onChange={handleFileChange}
              ref={inputRef}
              type="file"
              name="profile"
              id="profile"
              accept="image/*"
              className="hidden"
            />
            <div className="aspect-square w-32 rounded-full dark:text-white text-darkBlue flex items-center justify-center  border-dashed border dark:border-gray-200 border-darkBlue text-base relative">
              {profile ? (
                <>
                  <motion.img
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    src={profile}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <motion.button
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    whileFocus={{ scale: 1.05 }}
                    transition={{
                      duration: 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    type="button"
                    className="absolute top-1 right-1  rounded-full bg-red-500
                  hover:bg-red-600 transition-colors duration-200 p-2 ring-1 ring-white"
                  >
                    <FaRegTrashCan
                      onClick={() => handleDeleteImage()}
                      className="text-lg text-white w-full h-full"
                    />
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.div
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    whileFocus={{ scale: 1.05 }}
                    transition={{
                      duration: 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                    onClick={() => inputRef.current?.click()}
                  >
                    <IoCloudUploadOutline className="text-2xl" />
                    <h3>Upload</h3>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex-grow">
            <input
              {...register("username")}
              type="text"
              id="username"
              className="input bg-transparent"
              placeholder="username"
            />
          </div>
          <div className="flex-grow">
            <input
              {...register("email")}
              type="email"
              id="email"
              className="input bg-transparent"
              placeholder="email"
            />
          </div>
        </div>
        <textarea
          {...register("bio")}
          name="bio"
          id="bio"
          className="input resize-none bg-transparent"
          rows={2}
          placeholder="Short bio about you"
        ></textarea>
      </form>
    </motion.div>
  );
};

export default BasicInfo;
