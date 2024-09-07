import { Route, Routes, useLocation } from "react-router-dom";
import {
  AppContainer,
  AuthRedirect,
  CenteredSpinner,
  ErrorFallback,
} from "../components";
import { AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { lazy } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
const CreateBlog = lazy(() => import("./CreateBlog"));
const EmailVerification = lazy(() => import("./EmailVerification"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const Home = lazy(() => import("./Home"));
const ResetPassword = lazy(() => import("./ResetPassword"));
const Signin = lazy(() => import("./Signin"));
const SignUp = lazy(() => import("./SignUp"));
const Blog = lazy(() => import("./Blog"));
const ReadingList = lazy(() => import("./ReadingList"));
const Profile = lazy(() => import("./Profile"));
const Dashboard = lazy(() => import("./Dashboard"));
const UserProfile = lazy(() => import("./UserProfile"));
const Settings = lazy(() => import("./Settings"));
const PageNotFound = lazy(() => import("./PageNotFound"));

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
            <Suspense fallback={<CenteredSpinner />}>
              <Routes location={location} key={location.key}>
                {/* Routes wrapped by AppContainer */}
                <Route element={<AppContainer />}>
                  <Route path="/createblog" element={<CreateBlog />} />
                  <Route path="/readinglist" element={<ReadingList />} />
                  <Route path="/profile" element={<Profile />} />
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
                <Route
                  path="/verify/email/:code"
                  element={<EmailVerification />}
                />
                <Route path="/blog/:blogId" element={<Blog />} />
                <Route path="/:username" element={<UserProfile />} />

                {/* Fallback route */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
