import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UrlShortener from './pages/UrlShortener';
import StatsPage from './pages/StatsPage';
import RedirectHandler from './pages/RedirectHandler';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortener />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
