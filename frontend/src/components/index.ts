import { lazy } from "react";
import ThemeProvider from "./ThemeProvider";
import ErrorFallback from "./ErrorFallback";
import LoadingIndicator from "./LoadingIndicator";
import Spinner from "./Spinner";
import CenteredSpinner from "./CenteredSpinner";
import Header from "./Header";
import Hero from "./Hero";
import SEO from "./SEO";

const AppContainer = lazy(() => import("./AppContainer"));
const AuthRedirect = lazy(() => import("./AuthRedirect"));
const ProfileLayout = lazy(() => import("./ProfileLayout"));
const PaginationBar = lazy(() => import("./PaginationBar"));
const UserDetail = lazy(() => import("./UserDetail"));
const UserBlogList = lazy(() => import("./UserBlogList"));
const Statistics = lazy(() => import("./Statistics"));
const DashboardBlogList = lazy(() => import("./DashboardBlogList"));
const Blogs = lazy(() => import("./Blogs"));
const ResetPasswordForm = lazy(() => import("./ResetPasswordForm"));
const CreateBlogForm = lazy(() => import("./CreateBlogForm"));
const BlogDetail = lazy(() => import("./BlogDetail"));
const BasicInfo = lazy(() => import("./BasicInfo"));
const ChangePassword = lazy(() => import("./ChangePassword"));
const DeleteAccount = lazy(() => import("./DeleteAccount"));
export {
  Blogs,
  CreateBlogForm,
  ResetPasswordForm,
  BlogDetail,
  BasicInfo,
  ChangePassword,
  DeleteAccount,
  UserBlogList,
  PaginationBar,
  ProfileLayout,
  Statistics,
  DashboardBlogList,
  UserDetail,
  SEO,
  Hero,
  AppContainer,
  Header,
  Spinner,
  ThemeProvider,
  CenteredSpinner,
  AuthRedirect,
  LoadingIndicator,
  ErrorFallback,
};
