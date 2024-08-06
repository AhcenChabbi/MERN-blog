import { BlogName } from "../constants/constants";

const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="dark:text-white text-darkBlue text-4xl lg:text-6xl text-center font-bold">
        Welcome to {BlogName}
      </h1>
      <p className="text-center dark:text-gray-400 text-gray-600 text-lg max-w-96">
        Here you'll find a variety of articles and tutorials on topics such as
        web development, software engineering, and programming languages.
      </p>
    </div>
  );
};

export default Hero;
