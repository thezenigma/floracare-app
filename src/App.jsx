import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ChatProvider } from './context/ChatContext';
import { PlantProvider } from './context/PlantContext';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import AIAssistant from './pages/AIAssistant';
import Tutorial from './pages/Tutorial';
import PlantProfile from './pages/PlantProfile';
import Collection from './pages/Collection';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import AuthGate from './components/auth/AuthGate';

function PageTransition({ children }) {
  const location = useLocation();
  // We use 100vh so it always slides exactly one screen height, 
  // keeping the transition speed consistent regardless of page length.
  const direction = location.state?.direction === 'up' ? -1 : 1;
  
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 1, y: `${direction * 100}vh` }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 1, y: `${direction * -100}vh` }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="page-scroll-container w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col"
      style={{ gridColumn: 1, gridRow: 1 }}
    >
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      
      {location.pathname !== '/assistant' && (
        <footer className="w-full py-8 mt-auto flex justify-center items-center shrink-0">
          <p className="font-label-sm text-[12px] text-on-surface-variant font-medium text-center px-4">
            © 2026 FloraCare - Cultivating tranquility in your digital sanctuary.
          </p>
        </footer>
      )}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <div className="grid grid-cols-1 grid-rows-1 overflow-hidden w-full h-screen relative bg-background">
      <AnimatePresence initial={false}>
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/tutorial" element={<PageTransition><Tutorial /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
        <Route path="/collection" element={<AuthGate><PageTransition><DashboardLayout><Collection /></DashboardLayout></PageTransition></AuthGate>} />
        <Route path="/dashboard" element={<AuthGate><PageTransition><DashboardLayout><Dashboard /></DashboardLayout></PageTransition></AuthGate>} />
        <Route path="/journal" element={<AuthGate><PageTransition><DashboardLayout><Journal /></DashboardLayout></PageTransition></AuthGate>} />
        <Route path="/assistant" element={<AuthGate><PageTransition><DashboardLayout><AIAssistant /></DashboardLayout></PageTransition></AuthGate>} />
        <Route path="/plant/:id" element={<AuthGate><PageTransition><DashboardLayout><PlantProfile /></DashboardLayout></PageTransition></AuthGate>} />
      </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PlantProvider>
        <ChatProvider>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </ChatProvider>
      </PlantProvider>
    </ThemeProvider>
  );
}

export default App;
