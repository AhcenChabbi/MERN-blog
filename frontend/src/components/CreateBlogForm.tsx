import { z } from "zod";
import { blogSchema } from "../constants/constants";
import { useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuUploadCloud } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { createBlog } from "../lib/api";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { convertBase64 } from "../utils";
import TextEditor from "./TextEditor";
import queryClient from "../config/queryClient";
import { allBlogs } from "../hooks/queries/useBlogs";
import { navigate } from "../lib/navigation";
type FormFields = z.infer<typeof blogSchema>;
const CreateBlogForm = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm<FormFields>({ resolver: zodResolver(blogSchema) });
  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setValue("banner", file, { shouldValidate: true });
      setBannerUrl(URL.createObjectURL(file));
    }
  };
  const handleDeleteImage = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setValue("banner", new File([], ""), { shouldValidate: true });
    setBannerUrl(null);
  };
  const { mutate: createBlogHandler, isPending } = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      toast.success("Blog created successfully");
      queryClient.invalidateQueries({ queryKey: [allBlogs] });
      navigate("/");
    },
    onError: () => {
      toast.error("An error occured please try again");
    },
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const imageUrl = await convertBase64(data.banner);
    createBlogHandler({
      banner: imageUrl,
      title: data.title,
      content: data.content,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form max-w-3xl p-2  sm:p-4 md:p-6 space-y-4  mx-2"
    >
      <div className="">
        <input
          onChange={handleInputFileChange}
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
      <button disabled={isPending} type="submit" className="btn self-end px-4">
        {isPending ? <Spinner /> : "Publish"}
      </button>
    </form>
  );
};

export default CreateBlogForm;
