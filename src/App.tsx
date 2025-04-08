
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import TrainingMonitor from "./pages/TrainingMonitor";
import ModelExplainer from "./pages/ModelExplainer";
import NetworkExplorer from "./pages/NetworkExplorer";
import DataPipeline from "./pages/DataPipeline";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Logout from "./pages/Logout";

// Create the query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/training" element={<TrainingMonitor />} />
          <Route path="/explainer" element={<ModelExplainer />} />
          <Route path="/network" element={<NetworkExplorer />} />
          <Route path="/pipeline" element={<DataPipeline />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
