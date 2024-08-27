import { Route, Routes, useLocation } from "react-router-dom";
import AppContainer from "./AppContainer";
import {
  Blog,
  CreateBlog,
  Dashboard,
  EmailVerification,
  ForgotPassword,
  Home,
  MyProfile,
  ReadingList,
  ResetPassword,
  Settings,
  Signin,
  SignUp,
  UserProfile,
} from "../pages";
import PageNotFound from "../pages/PageNotFound";
import { AnimatePresence } from "framer-motion";
import AuthRedirect from "./AuthRedirect";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.key}>
        {/* Routes wrapped by AppContainer */}
        <Route element={<AppContainer />}>
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/readinglist" element={<ReadingList />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Auth related routes */}
        <Route element={<AuthRedirect />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/password/reset" element={<ResetPassword />} />
        </Route>

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/verify/email/:code" element={<EmailVerification />} />
        <Route path="/blog/:blogId" element={<Blog />} />
        <Route path="/:username" element={<UserProfile />} />

        {/* Fallback route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
