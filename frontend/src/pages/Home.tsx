import { BlogsList, Hero } from "../components";

const Home = () => {
  return (
    <div className="py-5 px-6 lg:px-12 space-y-4">
      <Hero />
      <BlogsList />
    </div>
  );
};

export default Home;
