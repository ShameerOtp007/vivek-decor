import React from 'react';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Packages from '../components/Packages';
import Location from '../components/Location';

const Home = () => {
  return (
    <main>
      <Hero />
      <Portfolio />
      <Packages />
      <Location />
    </main>
  );
};

export default Home;
