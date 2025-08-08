import React, { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Sonal Mehta",
    role: "D2C Brand Founder",
    avatar: "https://i.pravatar.cc/150?img=3",
    feedback:
      "MarketMinds helps us react faster to competitor price drops. We've avoided revenue loss by staying ahead of sudden market moves.",
  },
  {
    name: "Ravi Deshmukh",
    role: "Tech Startup CEO",
    avatar: "https://i.pravatar.cc/150?img=5",
    feedback:
      "Getting competitor intelligence used to take hours. Now, I get alerts and insights in minutes. This is like having a mini McKinsey on my team.",
  },
  {
    name: "Aarti Jain",
    role: "Category Manager, E-commerce",
    avatar: "https://i.pravatar.cc/150?img=8",
    feedback:
      "I can monitor every product launch and pricing shift from our rivals without manually checking 10 websites. It’s super efficient!",
  },
  {
    name: "Nikhil Verma",
    role: "Growth Lead, SaaS Platform",
    avatar: "https://i.pravatar.cc/150?img=9",
    feedback:
      "The insights for our marketing team have been incredible. We’ve adjusted campaigns based on competitor strategies and seen a lift in conversion.",
  },
  {
    name: "Farida Khan",
    role: "Retail Chain Operator",
    avatar: "https://i.pravatar.cc/150?img=11",
    feedback:
      "Smart recommendations help us price our products competitively across all stores. MarketMinds is like a market analyst that never sleeps.",
  },
  {
    name: "Tanay Mukherjee",
    role: "Analyst, Investment Firm",
    avatar: "https://i.pravatar.cc/150?img=12",
    feedback:
      "MarketMinds offers actionable signals, not just raw data. It’s made our competitive benchmarking process 5x faster.",
  },
];

const TestimonialCard = ({ name, role, avatar, feedback }) => (
  <div
    style={{
      backgroundColor: "var(--color-background-secondary)",
      border: `1px solid var(--color-text-muted)`,
      boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
      borderRadius: "12px",
      padding: "1.5rem",
      width: "20rem",
      minWidth: "20rem",
      height: "18rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
    className="hover:scale-105 hover:shadow-xl"
  >
    {/* Header */}
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
      <img
        src={avatar}
        alt={name}
        style={{
          width: "5rem",
          height: "5rem",
          borderRadius: "50%",
          border: `2px solid var(--color-accent-blue)`,
          objectFit: "cover",
        }}
      />
      <div>
        <h4 style={{ fontWeight: "600", color: "var(--color-text-normal)" }}>{name}</h4>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{role}</p>
      </div>
    </div>

    {/* Feedback */}
    <p
      style={{
        color: "var(--color-text-normal)",
        fontStyle: "italic",
        lineHeight: "1.5",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 5,
        WebkitBoxOrient: "vertical",
      }}
    >
      “{feedback}”
    </p>
  </div>
);

const Testimonial = () => {
  const marqueeRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = isPaused ? "paused" : "running";
    }
  }, [isPaused]);

  return (
    <section
      style={{
        backgroundColor: "var(--color-background-primary)",
        padding: "4rem 1rem",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: "3.5rem",
          backgroundImage: "linear-gradient(to right, var(--color-accent-yellow), var(--color-accent-blue))",
          WebkitBackgroundClip: "text",
          color: "transparent",
          letterSpacing: "2px",
        }}
      >
        What Our Users Say
      </h2>

      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          ref={marqueeRef}
          style={{
            display: "flex",
            gap: "1.5rem",
            animation: "scroll 10s linear infinite",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          div[ref="marqueeRef"] {
            animation: none !important;
            overflow-x: auto;
            flex-wrap: nowrap;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonial;
