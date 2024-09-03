import { Link } from "react-router-dom";

const LoginSignupLinks = () => {
  return (
    <>
      <Link
        className="py-1.5  dark:text-white text-darkBlue px-3 font-medium"
        to="/signin"
      >
        Sign in
      </Link>
      <Link
        className="py-1.5  dark:text-darkBlue dark:bg-white bg-darkBlue  text-white border rounded-lg px-3 transition-colors duration-300  font-medium hover:bg-transparent hover:text-darkBlue hover:border-darkBlue dark:hover:border-white dark:hover:bg-transparent dark:hover:text-white"
        to="/signup"
      >
        Sign up
      </Link>
    </>
  );
};

export default LoginSignupLinks;
