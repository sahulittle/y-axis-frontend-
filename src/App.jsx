import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./user/Navbar";
import Home from "./user/pages/Home";
import FreeEligiblityCheck from "./user/pages/FreeEligiblityCheck";
import Migrate from "./user/pages/Migrate";
import Work from "./user/pages/Work";
import Study from "./user/pages/Study";
import Visa from "./user/pages/Visa";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/free-eligibility-check" element={<FreeEligiblityCheck />} />
        <Route path="/migrate" element={<Migrate />} />
        <Route path="/work" element={<Work />}/>
        <Route path="/study" element={<Study />}/>
        <Route path="/visa" element={<Visa />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;