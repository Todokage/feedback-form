import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: "Flight Bookings",
    description: "Book flights to destinations worldwide with the best airlines and flexible options.",
    image: "./assets/flight.svg",
    color: "#4ea8de",
    route: "/flights"
  },
  {
    id: 2,
    title: "Hotel Reservations",
    description: "Find and reserve top-rated hotels, resorts, and unique stays for every budget.",
    image: "./assets/hotel.svg",
    color: "#4361ee",
    route: "/hotels"
  },
  {
    id: 3,
    title: "Guided Tours",
    description: "Explore cities and attractions with expert guides for a memorable experience.",
    image: "./assets/tour.svg",
    color: "#20b2aa",
    route: "/tours"
  },
  {
    id: 4,
    title: "Visa Assistance",
    description: "Get help with visa applications and travel documentation for a smooth journey.",
    image: "./assets/visa.svg",
    color: "#e75480",
    route: "/visa"
  }
];

const About = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  

  return (
    <section
      style={{
        margin: '64px auto 0 auto',
        padding: '48px 0 56px 0',
        background: 'linear-gradient(120deg, #e0e1dd 60%, #f8f9fa 100%)',
        borderRadius: 32,
        boxShadow: '0 8px 48px 0 rgba(34,34,59,0.10)',
        maxWidth: 1200,
        width: '95%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid #20b2aa22'
      }}
    >
      
      <h3 style={{
        fontSize: 38,
        fontWeight: 900,
        color: "#22223b",
        marginBottom: 12,
        letterSpacing: 2,
        textAlign: 'center',
        textShadow: '0 2px 12px #e0e1dd'
      }}>
        Our Services
      </h3>
      <p style={{
        color: "#555",
        fontSize: 18,
        maxWidth: 700,
        textAlign: 'center',
        marginBottom: 38,
        lineHeight: 1.6
      }}>
        We offer a wide range of travel services to make your journey seamless and enjoyable.
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          gap: 36,
          justifyContent: 'center',
          alignItems: 'stretch',
          width: '100%',
          maxWidth: 1000,
          margin: '0 auto'
        }}
      >
        {services.map(service => (
          <div
            key={service.id}
            onMouseEnter={() => setHovered(service.id)}
            onMouseLeave={() => setHovered(null)}
            tabIndex={0}
            aria-label={service.title}
            style={{
              background: hovered === service.id
                ? `linear-gradient(135deg, #fff 60%, ${service.color}22 100%)`
                : `linear-gradient(135deg, #fff 80%, ${service.color}11 100%)`,
              border: `2.5px solid ${hovered === service.id ? service.color : "#e0e1dd"}`,
              borderRadius: 22,
              boxShadow: hovered === service.id
                ? `0 8px 32px ${service.color}33`
                : `0 2px 16px rgba(34,34,59,0.08)`,
              padding: '36px 24px 28px 24px',
              width: 230,
              minHeight: 320,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.77,0,0.175,1)',
              outline: hovered === service.id ? `2px solid ${service.color}` : 'none',
              position: 'relative',
              overflow: 'hidden',
              transform: hovered === service.id ? 'scale(1.05)' : 'scale(1)',
              zIndex: hovered === service.id ? 2 : 1
            }}
            onClick={() => navigate(service.route)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate(service.route);
              }
            }}
          >
            {/* Decorative animated gradient bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 8,
                borderTopLeftRadius: 22,
                borderTopRightRadius: 22,
                background: hovered === service.id
                  ? `linear-gradient(90deg, ${service.color} 0%, #fff 100%)`
                  : `linear-gradient(90deg, #e0e1dd 0%, ${service.color} 100%)`,
                transition: 'background 0.3s'
              }}
            />
            {/* Decorative circle glow */}
            <div
              style={{
                position: 'absolute',
                top: -30,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 90,
                height: 90,
                borderRadius: '50%',
                background: hovered === service.id ? service.color + '33' : '#f8f9fa',
                filter: hovered === service.id ? 'blur(12px)' : 'blur(0px)',
                zIndex: 0,
                transition: 'background 0.3s, filter 0.3s'
              }}
            />
            <div
              style={{
                background: hovered === service.id ? service.color : "#f8f9fa",
                borderRadius: '50%',
                width: 74,
                height: 74,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 22,
                boxShadow: hovered === service.id
                  ? `0 2px 16px ${service.color}55`
                  : `0 1px 6px #22223b11`,
                transition: 'background 0.3s, box-shadow 0.3s',
                zIndex: 1
              }}
            >
              <img
                src={service.image}
                alt={service.title}
                style={{
                  width: 40,
                  height: 40,
                  filter: hovered === service.id
                    ? 'drop-shadow(0 0 12px #fff)'
                    : 'none',
                  transition: 'filter 0.3s'
                }}
              />
            </div>
            <div style={{
              fontSize: 24,
              fontWeight: 800,
              color: hovered === service.id ? service.color : "#22223b",
              marginBottom: 12,
              textAlign: 'center',
              letterSpacing: 1,
              transition: 'color 0.3s',
              zIndex: 1
            }}>
              {service.title}
            </div>
            <div style={{
              fontSize: 16,
              color: "#555",
              textAlign: 'center',
              marginBottom: 14,
              minHeight: 54,
              zIndex: 1
            }}>
              {service.description}
            </div>
            <button
              style={{
                marginTop: 10,
                padding: '8px 22px',
                borderRadius: 16,
                border: 'none',
                background: hovered === service.id ? service.color : "#e0e1dd",
                color: hovered === service.id ? "#fff" : "#22223b",
                fontWeight: 700,
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: hovered === service.id
                  ? `0 2px 12px ${service.color}55`
                  : `0 1px 4px #22223b11`,
                transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                zIndex: 1
              }}
              onClick={e => {
                e.stopPropagation();
                navigate(service.route);
              }}
              tabIndex={0}
            >
              Learn More
            </button>
            <div style={{
              fontSize: 40,
              fontWeight: 900,
              color: hovered === service.id ? service.color : "#4361ee",
              marginTop: 'auto',
              opacity: hovered === service.id ? 1 : 0.7,
              transition: 'color 0.3s, opacity 0.3s',
              textAlign: 'center',
              zIndex: 1
            }}>
              {service.id < 10 ? `0${service.id}` : service.id}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;