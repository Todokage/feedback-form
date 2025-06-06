import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthPage from './AuthPage';

const theme = {
  primary: "#22223b",
  accent: "#4ea8de",
  accent2: "#4361ee",
  bg: "#f8f9fa",
  card: "#fff",
  border: "#e0e1dd",
  shadow: "rgba(34,34,59,0.08)"
};

// 1 EUR = 140 KES (example rate, update as needed)
const EUR_TO_KES = 140;

const hotels = [
  {
    name: "Hotel Adlon Kempinski",
    description: "Luxury hotel at Brandenburg Gate, classic Berlin elegance.",
    price: 200 * EUR_TO_KES,
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    name: "25hours Hotel Bikini Berlin",
    description: "Trendy hotel with zoo and city views, urban jungle vibes.",
    price: 220 * EUR_TO_KES,
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

const slides = [
  {
    title: 'Brandenburg Gate',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Berlin’s most famous landmark.'
  },
  {
    title: 'Berlin Wall',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80',
    description: 'History and street art at the East Side Gallery.'
  }
];

const BerlinPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalHotel, setModalHotel] = useState(null);
  const [modalImageIdx, setModalImageIdx] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    phone: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [stkStatus, setStkStatus] = useState(null);

  // Auth state
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Home button visibility logic
  const navbarRef = useRef(null);
  const [showHomeBtn, setShowHomeBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return;
      const navbarBottom = navbarRef.current.getBoundingClientRect().bottom;
      setShowHomeBtn(navbarBottom < 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let imgInterval;
    if (modalHotel) {
      imgInterval = setInterval(() => {
        setModalImageIdx((prev) =>
          prev === modalHotel.images.length - 1 ? 0 : prev + 1
        );
      }, 3500);
    }
    return () => clearInterval(imgInterval);
  }, [modalHotel, modalHotel?.images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  const handlePrevImage = () => {
    setModalImageIdx((prev) =>
      prev === 0 ? modalHotel.images.length - 1 : prev - 1
    );
  };
  const handleNextImage = () => {
    setModalImageIdx((prev) =>
      prev === modalHotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = modalHotel
    ? modalHotel.price * (parseInt(bookingForm.guests, 10) || 1)
    : 0;

  const simulateSTKPush = (phone, amount) => {
    setStkStatus('pending');
    setTimeout(() => {
      setStkStatus('success');
      setBookingSuccess(true);
    }, 2000);
  };

  // Require login before confirming booking
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setStkStatus(null);
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    simulateSTKPush(bookingForm.phone, totalPrice);
  };

  // Auth success callback
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: theme.bg,
        fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
        overflowX: "hidden",
        boxSizing: "border-box"
      }}
    >
      {/* Modern Hero Section */}
      <div
        ref={navbarRef}
        style={{
          width: '100%',
          minHeight: 340,
          background: `linear-gradient(120deg, ${theme.accent2} 0%, ${theme.accent} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 8px 32px 0 ${theme.shadow}`,
          maxWidth: "100vw"
        }}
      >
        <img
          src={slide.image}
          alt={slide.title}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.25,
            filter: 'blur(1.5px) brightness(0.9)',
            maxWidth: "100vw"
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            width: '100%',
            maxWidth: "100vw"
          }}
        >
          <h1
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: 2,
              marginBottom: 8,
              textShadow: `0 2px 16px ${theme.accent2}99`
            }}
          >
            Welcome to Berlin
          </h1>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 600,
              marginBottom: 12,
              color: "#fff",
              textShadow: `0 2px 8px ${theme.accent}`
            }}
          >
            {slide.title}
          </h2>
          <p
            style={{
              fontSize: 20,
              color: "#fff",
              background: "#22223b33",
              display: "inline-block",
              borderRadius: 12,
              padding: "8px 24px",
              margin: "0 auto",
              boxShadow: `0 2px 8px ${theme.accent2}22`,
              maxWidth: "90vw",
              wordBreak: "break-word"
            }}
          >
            {slide.description}
          </p>
        </div>
        {/* Dots */}
        <div style={{
          position: 'absolute',
          bottom: 18,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 10,
          zIndex: 10
        }}>
          {slides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: idx === currentSlide ? theme.accent2 : '#fff',
                border: idx === currentSlide ? '2px solid #fff' : 'none',
                cursor: 'pointer',
                boxShadow: idx === currentSlide ? `0 0 8px ${theme.accent2}` : 'none',
                transition: 'background 0.3s, box-shadow 0.3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Home button appears only after scrolling past navbar */}
      {showHomeBtn && (
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'fixed',
            top: 24,
            left: 24,
            background: theme.accent2,
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '12px 28px',
            fontSize: 18,
            fontWeight: 700,
            cursor: 'pointer',
            zIndex: 20,
            boxShadow: `0 2px 8px ${theme.accent2}99`,
            transition: 'background 0.3s'
          }}
        >
          ← Home
        </button>
      )}

      {/* Hotel cards */}
      <section
        style={{
          width: '100%',
          maxWidth: 1200,
          margin: '40px auto 0',
          zIndex: 2,
          position: 'relative',
          background: theme.card,
          borderRadius: 24,
          boxShadow: `0 4px 32px ${theme.shadow}`,
          padding: '32px 0 40px 0',
          border: `1px solid ${theme.border}`,
          boxSizing: "border-box",
          overflowX: "auto"
        }}
      >
        <h2 style={{
          color: theme.primary,
          textAlign: 'center',
          marginBottom: 32,
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: 1
        }}>
          Top Hotels in Berlin
        </h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 36,
          justifyContent: 'center',
          maxWidth: "100%",
          boxSizing: "border-box"
        }}>
          {hotels.map((hotel, idx) => (
            <div
              key={hotel.name}
              style={{
                background: "#fff",
                borderRadius: 18,
                padding: 22,
                width: "min(270px, 90vw)",
                color: theme.primary,
                boxShadow: `0 2px 16px ${theme.shadow}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.3s cubic-bezier(0.77,0,0.175,1), box-shadow 0.3s',
                cursor: 'pointer',
                border: `1.5px solid ${theme.border}`,
                boxSizing: "border-box",
                minWidth: 0
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                style={{
                  width: '100%',
                  height: 130,
                  objectFit: 'cover',
                  borderRadius: 12,
                  marginBottom: 14,
                  boxShadow: `0 2px 8px ${theme.shadow}`,
                  maxWidth: "100%"
                }}
              />
              <h3 style={{
                marginBottom: 8,
                fontSize: 20,
                fontWeight: 700,
                color: theme.accent2
              }}>{hotel.name}</h3>
              <p style={{
                marginBottom: 10,
                fontSize: 15,
                color: theme.primary,
                background: "#f8f9fa",
                borderRadius: 8,
                padding: "4px 10px"
              }}>{hotel.description}</p>
              <p style={{
                marginBottom: 10,
                fontWeight: 'bold',
                fontSize: 16,
                color: theme.accent
              }}>KSH {hotel.price.toLocaleString()} per night</p>
              <button
                style={{
                  marginTop: 'auto',
                  fontSize: 16,
                  padding: '12px 0',
                  width: '100%',
                  borderRadius: 8,
                  background: theme.accent2,
                  color: "#fff",
                  fontWeight: 700,
                  border: 'none',
                  boxShadow: `0 2px 8px ${theme.accent2}33`,
                  cursor: 'pointer',
                  transition: 'background 0.3s, color 0.3s'
                }}
                onClick={() => {
                  setModalHotel(hotel);
                  setModalImageIdx(0);
                  setShowBooking(false);
                  setBookingSuccess(false);
                  setStkStatus(null);
                  setBookingForm({
                    name: '',
                    checkIn: '',
                    checkOut: '',
                    guests: 1,
                    phone: ''
                  });
                }}
              >
                View & Book
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for hotel details and booking */}
      {modalHotel && (
        <div
          style={{
            zIndex: 1002,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#22223bcc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              minWidth: '350px',
              width: '80vw',
              maxWidth: '900px',
              maxHeight: '95vh',
              background: "#fff",
              borderRadius: 20,
              position: 'relative',
              overflow: 'auto',
              padding: 40,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxSizing: 'border-box',
              justifyContent: 'center',
              animation: 'fadeInModal 0.6s cubic-bezier(0.77,0,0.175,1)',
              border: `2px solid ${theme.accent2}`,
              boxShadow: `0 4px 32px ${theme.accent2}33`
            }}
          >
            <button
              style={{
                position: 'absolute',
                top: 20,
                right: 32,
                background: theme.accent2,
                border: 'none',
                fontSize: 32,
                cursor: 'pointer',
                color: '#fff',
                borderRadius: 12,
                width: 44,
                height: 44,
                fontWeight: 900,
                boxShadow: `0 2px 8px ${theme.accent2}99`
              }}
              onClick={() => setModalHotel(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{
                textAlign: 'center',
                marginBottom: 24,
                fontSize: 26,
                color: theme.accent2,
                fontWeight: 800
              }}>{modalHotel.name}</h2>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 700,
                  height: 320,
                  marginBottom: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <button
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: theme.accent2,
                    border: 'none',
                    color: '#fff',
                    fontSize: 24,
                    borderRadius: '50%',
                    width: 38,
                    height: 38,
                    cursor: 'pointer',
                    zIndex: 2,
                    boxShadow: `0 2px 8px ${theme.accent2}99`
                  }}
                  onClick={handlePrevImage}
                  aria-label="Previous"
                >
                  &#8593;
                </button>
                <img
                  src={modalHotel.images[modalImageIdx]}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 14,
                    boxShadow: `0 2px 12px ${theme.accent2}22`,
                    margin: '48px 0 16px 0',
                    display: 'block'
                  }}
                />
                <button
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: theme.accent2,
                    border: 'none',
                    color: '#fff',
                    fontSize: 24,
                    borderRadius: '50%',
                    width: 38,
                    height: 38,
                    cursor: 'pointer',
                    zIndex: 2,
                    boxShadow: `0 2px 8px ${theme.accent2}99`
                  }}
                  onClick={handleNextImage}
                  aria-label="Next"
                >
                  &#8595;
                </button>
                <div
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12
                  }}
                >
                  {modalHotel.images.map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: i === modalImageIdx ? theme.accent2 : '#ccc',
                        display: 'inline-block',
                        margin: '2px 0',
                        border: i === modalImageIdx ? '2px solid #fff' : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
              <p style={{
                color: theme.accent2,
                fontWeight: 'bold',
                marginBottom: 18,
                fontSize: 20
              }}>
                Price per night: KSH {modalHotel.price.toLocaleString()}
              </p>
              
              {!showBooking && !bookingSuccess && (
                <button
                  style={{
                    width: '100%',
                    marginBottom: 20,
                    fontSize: 20,
                    padding: '16px 0',
                    borderRadius: 8,
                    background: theme.accent2,
                    color: '#fff',
                    fontWeight: 700,
                    border: 'none',
                    boxShadow: `0 2px 8px ${theme.accent2}99`,
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                  onClick={() => setShowBooking(true)}
                >
                  Book this Hotel
                </button>
              )}
              {showBooking && !bookingSuccess && (
                <form
                  onSubmit={handleBookingSubmit}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 18,
                    width: '100%',
                    maxWidth: 520,
                    alignItems: 'stretch'
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={bookingForm.name}
                    onChange={handleBookingChange}
                    required
                    style={{
                      width: '100%',
                      fontSize: 18,
                      padding: '12px 16px',
                      borderRadius: 8,
                      border: `1.5px solid ${theme.border}`,
                      background: '#fff',
                      color: theme.primary,
                      boxSizing: 'border-box'
                    }}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number"
                    value={bookingForm.phone}
                    onChange={handleBookingChange}
                    required
                    style={{
                      width: '100%',
                      fontSize: 18,
                      padding: '12px 16px',
                      borderRadius: 8,
                      border: `1.5px solid ${theme.border}`,
                      background: '#fff',
                      color: theme.primary,
                      boxSizing: 'border-box'
                    }}
                  />
                  <input
                    type="date"
                    name="checkIn"
                    placeholder="Check-in"
                    value={bookingForm.checkIn}
                    onChange={handleBookingChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    style={{
                      width: '100%',
                      fontSize: 18,
                      padding: '12px 16px',
                      borderRadius: 8,
                      border: `1.5px solid ${theme.border}`,
                      background: '#fff',
                      color: theme.primary,
                      boxSizing: 'border-box'
                    }}
                  />
                  <input
                    type="date"
                    name="checkOut"
                    placeholder="Check-out"
                    value={bookingForm.checkOut}
                    onChange={handleBookingChange}
                    min={bookingForm.checkIn || new Date().toISOString().split('T')[0]}
                    required
                    style={{
                      width: '100%',
                      fontSize: 18,
                      padding: '12px 16px',
                      borderRadius: 8,
                      border: `1.5px solid ${theme.border}`,
                      background: '#fff',
                      color: theme.primary,
                      boxSizing: 'border-box'
                    }}
                  />
                  <input
                    type="number"
                    name="guests"
                    placeholder="Rooms"
                    min={1}
                    max={10}
                    value={bookingForm.guests}
                    onChange={handleBookingChange}
                    required
                    style={{
                      width: '100%',
                      fontSize: 18,
                      padding: '12px 16px',
                      borderRadius: 8,
                      border: `1.5px solid ${theme.border}`,
                      background: '#fff',
                      color: theme.primary,
                      boxSizing: 'border-box'
                    }}
                  />
                  {showBooking && (
                    <p style={{
                      color: theme.primary,
                      fontWeight: 'bold',
                      marginBottom: 18,
                      fontSize: 20,
                      background: "#f8f9fa",
                      borderRadius: 8,
                      padding: "8px 18px"
                    }}>
                      Total: KSH {totalPrice.toLocaleString()}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={stkStatus === 'pending'}
                    style={{
                      width: '100%',
                      fontSize: 20,
                      padding: '16px 0',
                      borderRadius: 8,
                      marginTop: 6,
                      background: theme.accent2,
                      color: '#fff',
                      fontWeight: 700,
                      border: 'none',
                      boxShadow: `0 2px 8px ${theme.accent2}99`,
                      cursor: 'pointer',
                      transition: 'background 0.3s'
                    }}
                  >
                    {stkStatus === 'pending' ? 'Processing Payment...' : 'Confirm & Pay'}
                  </button>
                  {stkStatus === 'pending' && (
                    <div style={{ color: theme.accent2, marginTop: 10, fontWeight: 700 }}>
                      Please complete the payment on your phone...
                    </div>
                  )}
                  {stkStatus === 'success' && (
                    <div style={{ color: '#4bb543', marginTop: 10, fontWeight: 700 }}>
                      Payment received!
                    </div>
                  )}
                </form>
              )}
              {/* Require login/signup before confirming booking */}
              {showAuth && (
                <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.6)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ background: '#fff', borderRadius: 12, padding: 24, minWidth: 320, boxShadow: '0 4px 32px #22223b33', position: 'relative' }}>
                    <button
                      onClick={() => setShowAuth(false)}
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 14,
                        background: 'none',
                        border: 'none',
                        fontSize: 24,
                        color: '#888',
                        cursor: 'pointer'
                      }}
                      aria-label="Close"
                    >
                      &times;
                    </button>
                    <AuthPage onClose={() => setShowAuth(false)} onSuccess={handleAuthSuccess} />
                  </div>
                </div>
              )}
              {bookingSuccess && (
                <div style={{
                  textAlign: 'center',
                  marginTop: 22,
                  width: '100%',
                  background: 'none'
                }}>
                  <h4 style={{
                    fontSize: 22,
                    color: theme.accent2,
                    fontWeight: 800
                  }}>Booking Successful!</h4>
                  <p style={{ fontSize: 18, color: theme.primary }}>
                    Thank you for booking {modalHotel.name}.<br />
                    A confirmation has been sent to your email.
                  </p>
                  <button
                    onClick={() => setModalHotel(null)}
                    style={{
                      fontSize: 18,
                      padding: '14px 0',
                      width: '100%',
                      borderRadius: 8,
                      marginTop: 14,
                      background: theme.accent2,
                      color: '#fff',
                      fontWeight: 700,
                      border: 'none',
                      boxShadow: `0 2px 8px ${theme.accent2}99`,
                      cursor: 'pointer',
                      transition: 'background 0.3s'
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <style>
        {`
          html, body, #root {
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }
          @keyframes fadeInModal {
            from { opacity: 0; transform: scale(0.95);}
            to { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </div>
  );
};

export default BerlinPage;