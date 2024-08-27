import { useEffect } from "react";
import { CreateBlogForm } from "../components";
import { BlogName } from "../constants/Schemas";

const CreateBlog = () => {
  useEffect(() => {
    document.title = "Create Blog | " + BlogName;
  });
  return (
    <div className="flex-grow flex justify-center items-start pt-3">
      <CreateBlogForm />
    </div>
  );
};

export default CreateBlog;
