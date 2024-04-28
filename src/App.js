// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import DetailsPage from './DetailsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
