import React, { useEffect, useState } from 'react';
import './Header.css';

import banner1 from './images/banner1.jpeg';
import banner2 from './images/banner2.jpeg';
import banner3 from './images/banner3.jpeg';

const images = [banner1, banner2, banner3];

const Header = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 7000); // Change slide every 7 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="fracktal-hero"
      style={{
        backgroundImage: `linear-gradient(to right, #000000a5 40%, rgba(0, 0, 0, 0.6)), url(${images[currentImage]})`
      }}
    >
      <div className="text-center text-white header-center-content">
        <h1 className="hero-title">Production-Grade 3D Printing</h1>
        <p className="hero-subtitle">Powerful. Precise. Professional.</p>
        <a href="#products" className="btn btn-danger btn-lg rounded-pill mt-3">
          Explore Now
        </a>
      </div>
    </header>
  );
};

export default Header;
