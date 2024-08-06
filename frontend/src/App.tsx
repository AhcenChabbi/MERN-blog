import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import queryClient from "./config/queryClient";
import { setNabigate } from "./lib/navigation";
import { AppContainer, Header } from "./components";
import {
  Blog,
  CreateBlog,
  EmailVerification,
  ForgotPassword,
  Home,
  ResetPassword,
  Signin,
  SignUp,
} from "./pages";

function App() {
  const navigate = useNavigate();
  setNabigate(navigate);
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Routes>
        <Route element={<AppContainer />}>
          <Route path="/createblog" element={<CreateBlog />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} />
        <Route path="/verify/email/:code" element={<EmailVerification />} />
        <Route path="/blog/:blogId" element={<Blog />} />
      </Routes>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
