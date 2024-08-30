import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { signUpSchema } from "../constants/Schemas";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../lib/api";
import toast from "react-hot-toast";
import queryClient from "../config/queryClient";
import { AUTH } from "../hooks/queries/useAuth";
import { SEO, Spinner } from "../components";

type FormFields = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({ resolver: zodResolver(signUpSchema) });
  const navigate = useNavigate();
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate("/", {
        replace: true,
      });
      queryClient.invalidateQueries({ queryKey: [AUTH] });
    },
    onError: (error) => {
      toast.error(error.message || "An error occured");
    },
  });
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    registerUser(data);
  };
  return (
    <div className="flex items-center justify-center flex-grow">
      <SEO title="Signup" description="Signup" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form sm:p-4 md:p-6 space-y-2 p-2"
      >
        <h1 className="text-3xl font-medium text-gray-900 dark:text-white">
          Sign up
        </h1>
        <div>
          <label className="label" htmlFor="Username">
            Username:
          </label>
          <input
            {...register("username")}
            id="Username"
            type="text"
            className="input"
          />
          {errors.username && (
            <p className="text-redError text-sm">{errors.username.message}</p>
          )}
        </div>
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
        <div>
          <label className="label" htmlFor="Confirmpassword">
            Confirm password:
          </label>
          <input
            {...register("confirmPassword")}
            id="Confirmpassword"
            type="password"
            className="input"
          />
          {errors.confirmPassword && (
            <p className="text-redError text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button disabled={isPending} type="submit" className="btn mt-2">
          {isPending ? <Spinner /> : "Sign up"}
        </button>
        <div className="flex items-center gap-2 justify-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account?
          </span>
          <Link className="link" to="/signin">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
