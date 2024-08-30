import { z } from "zod";
import API from "../config/apiClient";
import {
  blogSchema,
  loginSchema,
  signUpSchema,
  updateUserPasswordSchema,
  UpdateUserSchema,
} from "../constants/Schemas";
import { Blog, User } from "../constants";
type loginCredentials = z.infer<typeof loginSchema>;

export const login = async (data: loginCredentials) =>
  API.post("/auth/login", data);

type registerCredentials = z.infer<typeof signUpSchema>;

export const signup = async (data: registerCredentials) =>
  API.post("/auth/register", data);

export const verifyEmail = async (id: string) =>
  API.get(`/auth/email/verify/${id}`);

export const sendPasswordResetEmail = async (email: string) =>
  API.post("/auth/password/forgot", { email });

export const resetPassword = async ({
  verificationCode,
  password,
}: {
  verificationCode: string;
  password: string;
}) => API.post("/auth/password/reset", { verificationCode, password });

export const getUser = async () => API.get<User>("/user");
export const logout = async () => API.get("/auth/logout");

export const updateUser = async (
  data: Partial<z.infer<typeof UpdateUserSchema>>
) => API.patch<User>(`/user`, data);

export const updatePassword = async (
  data: z.infer<typeof updateUserPasswordSchema>
) => API.patch<User>(`/user/updatePassword`, data);

export const deleteAccount = async () => API.delete("/user");

// Blog
type TBlog = z.infer<typeof blogSchema>;
export const createBlog = async (data: TBlog) => API.post<Blog>("/blog", data);
type blogsPagination = {
  blogs: Blog[];
  totalPages: number;
};
export const getBlogs = async (page = 1, limit = 9) =>
  API.get<blogsPagination>(`/blogs?page=${page}&limit=${limit}`);

export const getBlogbyId = async (blogId: string) =>
  API.get<{
    blog: Blog;
    authorBlogs: Blog[];
  }>(`/blogs/${blogId}`);

export type BlogReaction = { blog: Blog; user: User };
export const likeBlog = async (blogId: string) =>
  API.post<BlogReaction>(`/blog/liked/${blogId}`);

export const bookMarkBlog = async (blogId: string) =>
  API.post<BlogReaction>(`/blog/bookmarked/${blogId}`);

export const getReadingList = async (blogIds: string[], page = 1, limit = 9) =>
  API.post<blogsPagination>(`/blog/readinglist?page=${page}&limit=${limit}`, {
    blogIds: blogIds,
  });

export const incrementBlogTotalVisit = async (blogId: string) =>
  API.post<string>(`/blogs/${blogId}/visit`);

export const getCurrentUserBlogs = async () => API.get<Blog[]>(`/blog`);

export const deleteBlog = async (blogId: string) =>
  API.delete<{ user: User }>(`/blog/${blogId}`);

export type userAndUserBlogs = {
  user: Pick<
    User,
    "username" | "bio" | "profile" | "createdAt" | "blogPublished" | "_id"
  >;
  blogs: Blog[];
};
export const getUserAndUserBlogs = async (username: string) =>
  API.get<userAndUserBlogs>(`/blogs/userBlogs/${username}`);

export type UpdateBlogParams = {
  blogId: string;
  data: Partial<TBlog>;
};
export const updateBlog = async ({ blogId, data }: UpdateBlogParams) =>
  API.patch<Blog>(`/blog/${blogId}`, data);
