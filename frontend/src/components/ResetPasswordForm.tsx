import { z } from "zod";
import { passwordSchema } from "../constants/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../lib/api";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

const schema = z.object({
  password: passwordSchema,
});
type FormFields = z.infer<typeof schema>;
const ResetPasswordForm = ({ code }: { code: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const { mutate: resetUserPassword, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "An error occured");
    },
  });
  const onSubmit = (data: FormFields) => {
    resetUserPassword({ verificationCode: code, password: data.password });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[400px] flex flex-col gap-2 mx-6 sm:mx-0"
    >
      <h1 className="text-4xl text-darkBlue font-semibold dark:text-white mb-5 text-center">
        Change your password
      </h1>
      <label className="label" htmlFor="password">
        New password:
      </label>
      <input
        {...register("password")}
        placeholder="New password"
        className="input"
        type="password"
        id="password"
      />
      {errors.password && (
        <p className="text-redError text-sm">{errors.password.message}</p>
      )}
      <button disabled={isPending} type="submit" className="btn">
        {isPending ? <Spinner /> : "Reset password"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
