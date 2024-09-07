import { BlogName } from "../constants/Schemas";

const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="dark:text-white text-darkBlue text-4xl lg:text-5xl text-center font-bold">
        Welcome to {BlogName} Blog !
      </h1>
      <p className="text-center dark:text-gray-400 text-gray-600 text-lg max-w-96">
        We're a place where coders share, stay up-to-date and grow their
        careers.
      </p>
    </div>
  );
};

export default Hero;
