import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="min-h-screen bg-bg-dark text-text-main">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
