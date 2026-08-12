import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AskPage from "./pages/AskPage.jsx";
import PlanPage from "./pages/PlanPage.jsx";
import CelebratePage from "./pages/CelebratePage.jsx";
import MusicToggle from "./components/MusicToggle.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <MusicToggle />
      <Routes>
        <Route path="/" element={<AskPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/celebrate" element={<CelebratePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
