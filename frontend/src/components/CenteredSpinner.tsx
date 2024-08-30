import { Spinner } from ".";

const CenteredSpinner = () => {
  return (
    <div className="flex items-center justify-center flex-grow">
      <Spinner size={10} />
    </div>
  );
};

export default CenteredSpinner;
