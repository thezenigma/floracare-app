import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ChatProvider } from './context/ChatContext';
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
      className="page-scroll-container w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar"
      style={{ gridColumn: 1, gridRow: 1 }}
    >
      {children}
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
        <Route path="/collection" element={<PageTransition><Collection /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><DashboardLayout><Dashboard /></DashboardLayout></PageTransition>} />
        <Route path="/journal" element={<PageTransition><DashboardLayout><Journal /></DashboardLayout></PageTransition>} />
        <Route path="/assistant" element={<PageTransition><DashboardLayout><AIAssistant /></DashboardLayout></PageTransition>} />
        <Route path="/plant/:id" element={<PageTransition><DashboardLayout><PlantProfile /></DashboardLayout></PageTransition>} />
      </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;
