import { motion } from "framer-motion";
import { z } from "zod";
import { updateUserPasswordSchema } from "../constants/Schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUserPassword } from "../hooks/mutations/mutations";
import Spinner from "./Spinner";
type FormFields = z.infer<typeof updateUserPasswordSchema>;
const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(updateUserPasswordSchema),
  });
  const { mutate: updatePassword, isPending } = useUpdateUserPassword();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    updatePassword(data);
  };
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: 0.2 }}
      className="dark:bg-gray-800 bg-white rounded-xl shadow p-4"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex items-center justify-between ">
          <h2 className="text-xl font-normal dark:text-white text-darkBlue">
            Change Password
          </h2>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-4 py-1.5 rounded-full dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none flex items-center justify-center dark:focus:ring-blue-800">
            {isPending ? <Spinner /> : "Save Changes"}
          </button>
        </div>
        <div className="space-y-2.5">
          <div className="space-y-0.5">
            <input
              {...register("oldPassword")}
              type="password"
              id="oldPassword"
              className="input bg-transparent"
              placeholder="Old Password"
            />
            {errors.oldPassword && (
              <p className="text-redError text-sm">
                {errors.oldPassword.message}
              </p>
            )}
          </div>
          <div className="space-y-0.5">
            <input
              {...register("newPassword")}
              type="password"
              id="newPassword"
              className="input bg-transparent"
              placeholder="New Password"
            />
            {errors.newPassword && (
              <p className="text-redError text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className="space-y-0.5">
            <input
              {...register("confirmNewPassword")}
              type="password"
              id="confirmNewPassword"
              className="input bg-transparent"
              placeholder="Confirm New Password"
            />
            {errors.confirmNewPassword && (
              <p className="text-redError text-sm">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default ChangePassword;
