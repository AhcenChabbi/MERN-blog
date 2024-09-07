import { FaEye } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { User } from "../constants";
import { TiDocumentText } from "react-icons/ti";
import { useAuth } from "../hooks/queries/useAuth";
import { motion } from "framer-motion";

type Statistic = {
  number: number;
  title: string;
  icon: JSX.Element;
};
const Statistics = () => {
  const { user } = useAuth() as { user: User };
  const statistics: Statistic[] = [
    {
      number: user.totalVisits,
      title: "Total visits",
      icon: <FaEye className="text-darkBlue size-6" />,
    },
    {
      number: user.totalReactions,
      title: "Total reactions",
      icon: <FaHeart className="text-darkBlue size-6" />,
    },
    {
      number: user.blogPublished,
      title: "Total blogs",
      icon: <TiDocumentText className="text-darkBlue size-7" />,
    },
  ];
  return (
    <div className="w-full flex flex-col gap-x-2 gap-y-3 sm:flex-row">
      {statistics.map((statistic, ind) => (
        <StatisticsCard key={statistic.title} statistic={statistic} ind={ind} />
      ))}
    </div>
  );
};
const StatisticsCard = ({
  ind,
  statistic,
}: {
  ind: number;
  statistic: Statistic;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: ind * 0.2, type: "spring" }}
      key={statistic.title}
      className="flex items-center gap-x-2 dark:bg-gray-800 bg-gray-100 rounded-md py-4 px-3 flex-grow"
    >
      <div className="flex items-center justify-center w-12 h-12 bg-pink-300 rounded-md">
        {statistic.icon}
      </div>
      <div className="flex flex-col flex-grow">
        <p className="text-xl font-bold dark:text-white text-darkBlue">
          {statistic.number}
        </p>
        <p className="text-base dark:text-white text-darkBlue">
          {statistic.title}
        </p>
      </div>
    </motion.div>
  );
};

export default Statistics;
