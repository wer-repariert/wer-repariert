import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Startseite from "./components/Startseite";
import ErgebnisseiteVorschau from "./components/Firmenübersicht";
import Firmenprofil from "./components/DetailansichtFirma";
import FirmenkundenPrototyp from "./components/Adminportal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Startseite />} />
        <Route path="/ergebnisse" element={<ErgebnisseiteVorschau />} />
        <Route path="/firma" element={<Firmenprofil />} />
        <Route path="/admin" element={<FirmenkundenPrototyp />} />
      </Routes>
    </Router>
  );
}

export default App;
