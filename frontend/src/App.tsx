// import VaxCard from './components/vaxCard';
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/homePage.tsx";
import ChatPage from "./pages/chatPage.tsx";
import ResultPage from "./pages/resultPage.tsx";
import { AnimatePresence } from "motion/react";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
