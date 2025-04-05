import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  HashRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import History from "./Components/History";
import Racepage from "./Components/RacePage";
import Instructions from "./Components/Instructions";
import Quran from "./Components/Quran";
import Surah from "./Components/Surah";
import Notes from "./Components/Notes";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Racepage />} />
        <Route path="/history" element={<History />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/quran" element={<Quran />} />
        <Route path="/surah" element={<Surah />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </HashRouter>
  );
}
export default App;
