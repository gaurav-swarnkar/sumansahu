import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, type ReactNode } from "react";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import AboutPage from "./pages/AboutPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import IntroductionModal from "./components/IntroductionModal";
import ProtectedRoute from "./components/ProtectedRoute";
import { initializeAnalytics, trackVisitor } from "./lib/analytics";
import { pageVariants } from "./lib/transitions";

/*
 * ROUTES: every address on the site and the page file it shows.
 *
 *   /                      → pages/HomePage.tsx
 *   /portfolio             → pages/HomePage.tsx + introduction pop-up
 *   /projects              → pages/ProjectsPage.tsx
 *   /project/:projectId    → pages/ProjectDetailPage.tsx  (content from pages/projects/)
 *   /about                 → pages/AboutPage.tsx
 *   /workshop/login        → pages/admin/AdminLoginPage.tsx
 *   /workshop/dashboard    → pages/admin/AdminDashboardPage.tsx (login required)
 */

/** Wraps a page in the shared fade/slide page transition. */
function Animated({ children }: { children: ReactNode }) {
  return (
    <motion.div initial="hidden" animate="visible" exit="exit" variants={pageVariants}>
      {children}
    </motion.div>
  );
}

function HomeWithIntroduction() {
  const [isIntroductionOpen, setIsIntroductionOpen] = useState(true);
  return (
    <>
      <HomePage />
      <IntroductionModal isOpen={isIntroductionOpen} onClose={() => setIsIntroductionOpen(false)} />
    </>
  );
}

function SiteRoutes() {
  const location = useLocation();
  const [active, setActive] = useState(0);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Animated><HomePage /></Animated>} />
        <Route path="/portfolio" element={<Animated><HomeWithIntroduction /></Animated>} />
        <Route
          path="/projects"
          element={
            <Animated>
              <ProjectsPage active={active} setActive={setActive} onBack={() => window.history.back()} />
            </Animated>
          }
        />
        <Route path="/project/:projectId" element={<Animated><ProjectDetailPage /></Animated>} />
        <Route path="/about" element={<Animated><AboutPage /></Animated>} />
      </Routes>
    </AnimatePresence>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/workshop/login" element={<AdminLoginPage />} />
      <Route
        path="/workshop/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/workshop/*" element={<AdminLoginPage />} />
    </Routes>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/workshop");

  useEffect(() => {
    initializeAnalytics();
    // Count visitors on the portfolio only, not on the admin panel.
    if (!isAdmin) trackVisitor();
  }, []);

  return <div className="min-h-screen w-full bg-canvas">{isAdmin ? <AdminRoutes /> : <SiteRoutes />}</div>;
}
