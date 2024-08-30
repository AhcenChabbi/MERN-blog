import { lazy } from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";
const Hero = lazy(() => import("./Hero"));
import ProfileDropdown from "./ProfileDropdown";
const ResetPasswordForm = lazy(() => import("./ResetPasswordForm"));
import Spinner from "./Spinner";
import ThemeProvider from "./ThemeProvider";
import BlogCard from "./BlogCard";
const BlogsList = lazy(() => import("./BlogsList"));
const CreateBlogForm = lazy(() => import("./CreateBlogForm"));
const BlogDetail = lazy(() => import("./BlogDetail"));
import TextEditor from "./TextEditor";
import Toolbar from "./Toolbar";
import AuthorBlogCard from "./AuthorBlogCard";
import PaginationBar from "./PaginationBar";
const UserDetail = lazy(() => import("./UserDetail"));
import Error from "./Error";
import AnimatedRoutes from "../pages/AnimatedRoutes";
const BasicInfo = lazy(() => import("./BasicInfo"));
const ChangePassword = lazy(() => import("./ChangePassword"));
const DeleteAccount = lazy(() => import("./DeleteAccount"));
const UserBlogList = lazy(() => import("./UserBlogList"));
import CenteredSpinner from "./CenteredSpinner";
const ProfileLayout = lazy(() => import("./ProfileLayout"));
import Statistics from "./Statistics";
import DashboardBlogCard from "./DashboardBlogCard";
const DashboardBlogList = lazy(() => import("./DashboardBlogList"));
import SEO from "./SEO";
import AuthRedirect from "./AuthRedirect";
export {
  AppContainer,
  CreateBlogForm,
  Header,
  Hero,
  ProfileDropdown,
  ResetPasswordForm,
  Spinner,
  ThemeProvider,
  BlogCard,
  BlogsList,
  BlogDetail,
  TextEditor,
  Toolbar,
  AuthorBlogCard,
  PaginationBar,
  UserDetail,
  Error,
  AnimatedRoutes,
  BasicInfo,
  ChangePassword,
  DeleteAccount,
  UserBlogList,
  CenteredSpinner,
  ProfileLayout,
  Statistics,
  DashboardBlogCard,
  DashboardBlogList,
  SEO,
  AuthRedirect,
};
