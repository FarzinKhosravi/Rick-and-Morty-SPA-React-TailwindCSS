import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";
import EpisodePage from "./pages/EpisodePage";
import LocationPage from "./pages/LocationPage";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 font-serif">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="characters" element={<CharacterPage />} />
          <Route path="episodes" element={<EpisodePage />} />
          <Route path="locations" element={<LocationPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
