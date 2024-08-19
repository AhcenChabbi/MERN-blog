import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { sendPasswordResetEmail } from "../lib/api";
import toast from "react-hot-toast";
import { Spinner } from "../components";
import { emailSchema } from "../constants/constants";

const schema = z.object({
  email: emailSchema,
});
type FormFields = z.infer<typeof schema>;

const ForgotPassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({ resolver: zodResolver(schema) });
  const { mutate: sendPasswordReset, isPending } = useMutation({
    mutationFn: sendPasswordResetEmail,
    onError: () => {
      toast.error("An error occured please verify you email", {
        duration: 8000,
      });
    },
    onSuccess: () => {
      toast.success("Email sent! Check your inbox for further instructions.", {
        duration: 8000,
      });
    },
  });
  const onSubmit = (data: FormFields) => {
    sendPasswordReset(data.email);
  };
  return (
    <div className="flex items-center justify-center flex-grow">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form sm:p-6 md:p-8 space-y-4 p-4"
      >
        <h1 className="text-3xl font-medium text-gray-900 dark:text-white text-center">
          Reset your password
        </h1>
        <div>
          <label className="label" htmlFor="Email">
            Email:
          </label>
          <input
            {...register("email")}
            id="Email"
            type="text"
            className="input"
          />
          {errors.email && (
            <p className="text-redError text-sm">{errors.email.message}</p>
          )}
        </div>
        <button disabled={isPending} type="submit" className="btn">
          {isPending ? <Spinner /> : "Send"}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Go back to
          </span>
          <Link to="/signin" className="link">
            Sign in
          </Link>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
            or
          </span>
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
