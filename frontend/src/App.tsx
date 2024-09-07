import { QueryClientProvider } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import queryClient from "./config/queryClient";
import { setNavigate } from "./lib/navigation";
import { Header } from "./components";
import AnimatedRoutes from "./pages/AnimatedRoutes";

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <AnimatedRoutes />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
