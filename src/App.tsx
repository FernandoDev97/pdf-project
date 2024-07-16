// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Home";
import PageToDownload from "./PageToDownload";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/download-page" element={<PageToDownload />} />
      </Routes>
    </Router>
  );
};

export default App;
