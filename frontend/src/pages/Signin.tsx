import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { loginSchema } from "../constants/constants";
import { useMutation } from "@tanstack/react-query";
import { login } from "../lib/api";
import toast from "react-hot-toast";
import { AUTH } from "../hooks/queries/useAuth";
import queryClient from "../config/queryClient";
import { Spinner } from "../components";

type FormFields = z.infer<typeof loginSchema>;
const Signin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({ resolver: zodResolver(loginSchema) });
  const location = useLocation();
  const redirectUrl = location.state?.redirectUrl || "/";
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    signIn(data);
  };
  const navigate = useNavigate();
  const { mutate: signIn, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(redirectUrl, {
        replace: true,
      });
      queryClient.invalidateQueries({ queryKey: [AUTH] });
    },
    onError: () => {
      toast.error("Invalid email or password");
    },
  });
  return (
    <div className="flex items-center justify-center flex-grow">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form sm:p-6 md:p-8 space-y-4 p-4"
      >
        <h1 className="text-3xl font-medium text-gray-900 dark:text-white">
          Sign in
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
        <div>
          <label className="label" htmlFor="Password">
            Password:
          </label>
          <input
            {...register("password")}
            id="Password"
            type="password"
            className="input"
          />
          {errors.password && (
            <p className="text-redError text-sm">{errors.password.message}</p>
          )}
        </div>
        <Link className="link text-right" to="/forgotpassword">
          Forgot password?
        </Link>
        <button disabled={isPending} type="submit" className="btn">
          {isPending ? <Spinner /> : "Sign in"}
        </button>
        <div className="flex items-center gap-2 justify-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Don't have an account?
          </span>
          <Link className="link" to="/signup">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
