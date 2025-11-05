import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import ResumeVersions from "./pages/ResumeVersions";
import Plan from "./pages/Plan";
import Interview from "./pages/Interview";
import InterviewSession from "./pages/InterviewSession";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import LegalPolicies from "./pages/LegalPolicies";
import Support from "./pages/Support";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/resume/:resumeId" element={<ResumeVersions />} />
          <Route path="/plan/:planId" element={<Plan />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/interview/session/:sessionId" element={<InterviewSession />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/legal/policies" element={<LegalPolicies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
