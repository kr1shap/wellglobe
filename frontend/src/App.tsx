// import VaxCard from './components/vaxCard';
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from './pages/homePage.tsx';
import ChatPage from './pages/chatPage.tsx';
import ResultPage from './pages/resultPage.tsx';

function App() {
  const location = useLocation();

  return (
    // <div className="flex flex-col justify-center items-center">
    //   <p className="text-2xl text-amber-500">yo</p>
    //   <div className="bg-amber-700 w-3xl">hello this is a sample usage of tailwind</div>
    //   <p>what md: means is, if screen is greater or equal to 'medium' size, then use bg-amber-400 colour. Else use 800</p>
    //   <VaxCard description="thingy"/>
    // </div>
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomePage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/chat" element={<ChatPage />} />

    </Routes>

  )
}

export default App
