import { lazy } from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";
import Spinner from "./Spinner";
import ThemeProvider from "./ThemeProvider";
import BlogCard from "./BlogCard";
import TextEditor from "./TextEditor";
import Toolbar from "./Toolbar";
import AuthorBlogCard from "./AuthorBlogCard";
import PaginationBar from "./PaginationBar";
import AnimatedRoutes from "../pages/AnimatedRoutes";
import Error from "./Error";
import CenteredSpinner from "./CenteredSpinner";
import EmptyReadingList from "./EmptyReadingList";
import SEO from "./SEO";
import AuthRedirect from "./AuthRedirect";
import ReadingListBlogs from "./ReadingListBlogs";
import DashboardBlogCard from "./DashboardBlogCard";
import ProfileLayout from "./ProfileLayout";
import UserDetail from "./UserDetail";
import UserBlogList from "./UserBlogList";
import Statistics from "./Statistics";
import DashboardBlogList from "./DashboardBlogList";

const Hero = lazy(() => import("./Hero"));
const BlogsList = lazy(() => import("./BlogsList"));

const ResetPasswordForm = lazy(() => import("./ResetPasswordForm"));
const CreateBlogForm = lazy(() => import("./CreateBlogForm"));
import BlogDetail from "./BlogDetail";

const BasicInfo = lazy(() => import("./BasicInfo"));
const ChangePassword = lazy(() => import("./ChangePassword"));
const DeleteAccount = lazy(() => import("./DeleteAccount"));
export {
  Hero,
  BlogsList,
  CreateBlogForm,
  ResetPasswordForm,
  BlogDetail,
  BasicInfo,
  ChangePassword,
  DeleteAccount,
  UserBlogList,
  PaginationBar,
  TextEditor,
  AppContainer,
  Header,
  Spinner,
  ThemeProvider,
  BlogCard,
  Toolbar,
  AuthorBlogCard,
  UserDetail,
  Error,
  AnimatedRoutes,
  CenteredSpinner,
  ProfileLayout,
  Statistics,
  DashboardBlogCard,
  DashboardBlogList,
  SEO,
  AuthRedirect,
  ReadingListBlogs,
  EmptyReadingList,
};
