import { z } from "zod";
import { blogSchema } from "../constants/Schemas";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuUploadCloud } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import Spinner from "./Spinner";
import { convertBase64, getModifiedData, isEmptyObject } from "../utils";
import TextEditor from "./TextEditor";
import { useCreateBlog, useUpdateBlog } from "../hooks/mutations/mutations";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import toast from "react-hot-toast";
type FormFields = z.infer<typeof blogSchema>;
type LocationState = {
  defaultValues: FormFields;
  blogId: string;
  isUpdatingState: boolean;
};
const CreateBlogForm = () => {
  const { state } = useLocation();
  const { defaultValues, blogId, isUpdatingState } = (state || {
    defaultValues: {} as FormFields,
    blogId: "",
    isUpdatingState: false,
  }) as LocationState;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    watch,
  } = useForm<FormFields>({ resolver: zodResolver(blogSchema), defaultValues });
  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const bannerUrl = await convertBase64(file);
      setValue("banner", bannerUrl, { shouldValidate: true });
    }
  };
  const handleDeleteImage = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setValue("banner", "", { shouldValidate: true });
  };
  const { mutate: createBlog, isPending: isCreatingStatus } = useCreateBlog();
  const { mutate: updateBlog, isPending: isUpdatingStatus } = useUpdateBlog();
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (isUpdatingState) {
      const modifiedData = getModifiedData(defaultValues, data);
      if (isEmptyObject(modifiedData)) {
        toast.error("No changes made");
      } else {
        updateBlog({ blogId, data: modifiedData });
      }
    } else {
      createBlog(data);
    }
  };
  const bannerUrl = watch("banner");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form max-w-3xl p-2  sm:p-4 md:p-6 space-y-4  mx-2"
    >
      <div>
        <input
          onChange={handleFileInputChange}
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/jpeg, image/png"
        />
        {bannerUrl ? (
          <div className="rounded-lg overflow-hidden relative">
            <img
              src={bannerUrl}
              alt="blog image"
              className="max-h-48 object-cover w-full"
            />
            <button
              onClick={handleDeleteImage}
              type="button"
              className=" absolute right-3 top-3 btn  p-2 rounded-full"
            >
              <FaRegTrashCan className="text-lg text-white" />
            </button>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center flex-col gap-2 border-2 border-dashed border-gray-800 py-12 dark:border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => {
                inputRef.current?.click();
              }}
              className="flex px-4 py-1.5 items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-xl text-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <LuUploadCloud className="text-white" />
              <span className="text-white">Upload image</span>
            </button>
            {errors.banner && (
              <p className="text-redError text-base">
                {errors.banner.message as string}
              </p>
            )}
          </div>
        )}
      </div>
      <div>
        <input
          {...register("title")}
          type="text"
          placeholder="Article title..."
          className="input text-xl "
        />
        {errors.title && (
          <p className="text-redError text-base">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextEditor content={field.value} onChange={field.onChange} />
          )}
        />
        {errors.content && (
          <p className="text-redError text-base">{errors.content.message}</p>
        )}
      </div>
      <button
        disabled={isCreatingStatus || isUpdatingStatus}
        type="submit"
        className="btn self-end px-4"
      >
        {isCreatingStatus || isUpdatingStatus ? (
          <Spinner />
        ) : isUpdatingState ? (
          "Update"
        ) : (
          "Create"
        )}
      </button>
    </form>
  );
};

export default CreateBlogForm;
