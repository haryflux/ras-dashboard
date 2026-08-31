import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { DashboardPage } from "./routes/pages/DashboardPage";
import { ProfilePage } from "./routes/pages/ProfilePage";
import { SkillsPage } from "./routes/pages/SkillsPage";
import { LearningPage } from "./routes/pages/LearningPage";
import { KnowledgeAssistantPage } from "./routes/pages/KnowledgeAssistantPage";
import { NotFoundPage } from "./routes/pages/NotFoundPage";
import {
  SimulationsPage,
  CertificationsPage,
  ProgressPage,
  TeamSkillsPage,
  TeamProgressPage,
  AssessmentsPage,
} from "./routes/pages/SimplePages";

// ---------------------------------------------------------------------------
// All application routes. We nest every page inside <AppLayout> so they all
// share the same header + sidebar shell. The URL carries the persona
// (/associate/... or /manager/...), and the sidebar shows the right links.
// ---------------------------------------------------------------------------

export default function App() {
  return (
    <Routes>
      {/* Send the root URL to the associate dashboard by default. */}
      <Route path="/" element={<Navigate to="/associate/dashboard" replace />} />

      {/* Associate + Manager share the same shell via AppLayout. */}
      <Route element={<AppLayout />}>
        {/* Associate routes */}
        <Route path="/associate/dashboard" element={<DashboardPage />} />
        <Route path="/associate/profile" element={<ProfilePage />} />
        <Route path="/associate/skills" element={<SkillsPage />} />
        <Route path="/associate/learning" element={<LearningPage />} />
        <Route path="/associate/assistant" element={<KnowledgeAssistantPage />} />
        <Route path="/associate/simulations" element={<SimulationsPage />} />
        <Route path="/associate/certifications" element={<CertificationsPage />} />
        <Route path="/associate/progress" element={<ProgressPage />} />

        {/* Manager routes */}
        <Route path="/manager/dashboard" element={<DashboardPage />} />
        <Route path="/manager/team-skills" element={<TeamSkillsPage />} />
        <Route path="/manager/team-progress" element={<TeamProgressPage />} />
        <Route path="/manager/assessments" element={<AssessmentsPage />} />
        <Route path="/manager/certifications" element={<CertificationsPage />} />
      </Route>

      {/* Anything else -> 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
