import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import ProjectStories from "./components/ProjectStories";
import ProjectDetail from "./components/ProjectDetail";
import About from "./components/About";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./admin/ProtectedRoute";
import { initializeAnalytics, trackVisitor } from "./utils/analytics";

function AnimatedRoutes() {
  const location = useLocation();
  const [active, setActive] = useState(0);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
            </motion.div>
          }
        />
        <Route
          path="/projects"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectStories
                active={active}
                setActive={setActive}
                onBack={() => window.history.back()}
              />
            </motion.div>
          }
        />
        <Route
          path="/project/:projectId"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectDetail />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <About />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    // Initialize analytics system
    initializeAnalytics();
    
    // Track this visitor (only for portfolio pages, not admin panel)
    if (!window.location.pathname.startsWith('/workshop')) {
      trackVisitor();
    }
  }, []);

  // Admin routes - no animation
  if (window.location.pathname.startsWith('/workshop')) {
    return (
      <div className="min-h-screen w-full bg-canvas">
        <Routes>
          <Route path="/workshop/login" element={<AdminLogin />} />
          <Route
            path="/workshop/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/workshop/*" element={<AdminLogin />} />
        </Routes>
      </div>
    );
  }

  // Portfolio routes - with animation
  return (
    <div className="min-h-screen w-full bg-canvas">
      <AnimatedRoutes />
    </div>
  );
}
