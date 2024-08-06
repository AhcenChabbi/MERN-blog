import { z } from "zod";
import API from "../config/apiClient";
import { IBlog, loginSchema, signUpSchema } from "../constants/constants";
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

// Blog

export const createBlog = async (data: IBlog) => API.post("/blog", data);

export const getBlogs = async (page = 1, limit = 9) =>
  API.get<{ blogs: Blog[]; totalPages: number }>(
    `/blogs?page=${page}&limit=${limit}`
  );

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
