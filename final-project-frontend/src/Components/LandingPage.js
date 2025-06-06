import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const sections = [
  { id: 'Diani,KENYA', title: 'Diani', theme: 'blue' },
  { id: 'Tokyo,JAPAN', title: 'Tokyo', theme: 'pink' },
  { id: 'Monaco,', title: 'Monaco', theme: 'red' },
  { id: 'Dubai,UNITED ARAB EMIRATES', title: 'Dubai', theme: 'gold' },
  { id: 'London,UNITED KINGDOM', title: 'London', theme: 'brown' },
  { id: 'New York,USA', title: 'New York', theme: 'indigo' },
  { id: 'Paris,FRANCE', title: 'Paris', theme: 'purple' },
  { id: 'Berlin,GERMANY', title: 'Berlin', theme: 'teal' },
];

const themeColors = {
  blue: '#20b2aa',
  pink: '#e75480',
  red: '#e74c3c',
  gold: '#ffd700',
  brown: '#8b5c2a',
  indigo: '#4b0082',
  purple: '#8e44ad',
  teal: '#20cfcf'
};

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sections.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [hovered]);

  const handleVisitNow = (section) => {
    navigate(`/visit/${section.title.toLowerCase().replace(/\s+/g, '')}`);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? sections.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sections.length);
  };

  return (
    <div
      className={`landing-page theme-${sections[currentSlide].theme}`}
      style={{
        minHeight: '100vh',
        width: '100vw',
        height: '100vh',
        paddingTop: 40,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        overflowY: 'auto',
        background: `linear-gradient(135deg, ${themeColors[sections[currentSlide].theme]}33 0%, #1a3a3a 100%)`,
        fontFamily: 'EuclidSquare, Inter, Segoe UI, Arial, sans-serif'
      }}
    >
      {/* Previous Arrow */}
      <button
        onClick={handlePrev}
        aria-label="Previous Location"
        style={{
          position: 'absolute',
          top: '50%',
          left: 24,
          transform: 'translateY(-50%)',
          background: themeColors[sections[currentSlide].theme],
          border: 'none',
          color: '#fff',
          fontSize: 40,
          borderRadius: '50%',
          width: 54,
          height: 54,
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 0 16px 4px rgba(46,229,157,0.25)',
          fontFamily: 'EuclidSquare, Inter, Segoe UI, Arial, sans-serif'
        }}
      >
        &#8592;
      </button>

      {/* Carousel Content */}
      <div
        style={{
          textAlign: 'center',
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 24,
          padding: '48px 32px 40px 32px',
          margin: 0,
          maxWidth: 480,
          minWidth: 320,
          width: '90vw',
          boxShadow: `0 0 32px 0 ${themeColors[sections[currentSlide].theme]}55`,
          border: `3px solid ${themeColors[sections[currentSlide].theme]}`,
          transition: 'border 0.5s, box-shadow 0.5s',
          fontFamily: 'EuclidSquare, Inter, Segoe UI, Arial, sans-serif'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <h2
          style={{
            fontSize: 40,
            marginBottom: 18,
            color: themeColors[sections[currentSlide].theme],
            letterSpacing: 2,
            fontWeight: 700,
            textShadow: `0 2px 12px ${themeColors[sections[currentSlide].theme]}55`,
            opacity: hovered ? 0.8 : 1,
            transition: 'opacity 0.6s cubic-bezier(0.77,0,0.175,1)',
            fontFamily: 'EuclidSquare, Inter, Segoe UI, Arial, sans-serif'
          }}
        >
          {sections[currentSlide].title}
        </h2>
        <button
          onClick={() => handleVisitNow(sections[currentSlide])}
          style={{
            padding: '16px 36px',
            borderRadius: 12,
            border: 'none',
            background: themeColors[sections[currentSlide].theme],
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 22,
            cursor: 'pointer',
            boxShadow: `0 2px 16px ${themeColors[sections[currentSlide].theme]}55`,
            marginTop: 12,
            transition: 'background 0.3s, box-shadow 0.3s',
            fontFamily: 'EuclidSquare, Inter, Segoe UI, Arial, sans-serif'
          }}
        >
          Visit now 
        </button>
      </div>

      {/* Dots for current location */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          marginTop: 32,
          maxWidth: '90vw',
          flexWrap: 'wrap',
          fontFamily: 'EuclidSquare, Inter, Segoe UI, Arial, sans-serif'
        }}
      >
        {sections.map((_, i) => (
          <span
            key={i}
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: i === currentSlide ? themeColors[sections[currentSlide].theme] : '#ccc',
              display: 'inline-block',
              boxShadow: i === currentSlide ? `0 0 8px 2px ${themeColors[sections[currentSlide].theme]}88` : 'none',
              border: i === currentSlide ? `2px solid #fff` : 'none',
              transition: 'background 0.3s, box-shadow 0.3s, border 0.3s'
            }}
          />
        ))}
      </div>

      {/* Location Chips */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 10,
          marginTop: 32,
          flexWrap: 'wrap',
          maxWidth: '95vw',
          fontFamily: 'EuclidSquare, Inter, Segoe UI, Arial, sans-serif'
        }}
      >
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => setCurrentSlide(idx)}
            style={{
              padding: '8px 18px',
              borderRadius: 20,
              border: idx === currentSlide ? `2px solid ${themeColors[sections[currentSlide].theme]}` : '1px solid #bbb',
              background: idx === currentSlide ? themeColors[sections[currentSlide].theme] : '#fff',
              color: idx === currentSlide ? '#fff' : '#222',
              fontWeight: idx === currentSlide ? 700 : 500,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: idx === currentSlide ? `0 2px 8px ${themeColors[sections[currentSlide].theme]}55` : 'none',
              transition: 'all 0.3s',
              fontFamily: 'EuclidSquare, Inter, Segoe UI, Arial, sans-serif'
            }}
          >
            {section.title}
          </button>
        ))}
      </div>

      {/* Next Arrow */}
      <button
        onClick={handleNext}
        aria-label="Next Location"
        style={{
          position: 'absolute',
          top: '50%',
          right: 24,
          transform: 'translateY(-50%)',
          background: themeColors[sections[currentSlide].theme],
          border: 'none',
          color: '#fff',
          fontSize: 40,
          borderRadius: '50%',
          width: 54,
          height: 54,
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 0 16px 4px rgba(46,229,157,0.25)',
          fontFamily: 'EuclidSquare, Inter, Segoe UI, Arial, sans-serif'
        }}
      >
        &#8594;
      </button>
      
    </div>
  );
};

export default LandingPage;