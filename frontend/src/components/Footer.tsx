import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const yearDisplay = currentYear === 2025 ? "2025" : `2025-${currentYear}`;

  return (
    <footer
      style={{
        backgroundColor: "var(--color-background-secondary)",
        color: "var(--color-text-normal)",
        paddingTop: "3rem",
        paddingBottom: "2rem",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Branding (Top Row) */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "800",
              color: "var(--color-accent-yellow)",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "0.5rem",
            }}
          >
            MarketMinds
          </div>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-muted)",
              maxWidth: "500px",
            }}
          >
            Powerful competitor tracking & pricing automation for every industry.
          </p>
        </div>

        {/* Bottom Row - Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            borderTop: `1px solid var(--color-text-muted)`,
            paddingTop: "2rem",
          }}
        >
          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--color-accent-yellow)",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Features", "Pricing", "Testimonials", "Team", "Contact"].map((item) => (
                <li key={item} style={{ marginBottom: "0.5rem" }}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    style={{
                      color: "var(--color-text-muted)",
                      textDecoration: "none",
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--color-accent-yellow)",
              }}
            >
              Resources
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Help Center", "Compliance Guides", "API Docs", "Blog", "Support"].map(
                (item, idx) => (
                  <li key={idx} style={{ marginBottom: "0.5rem" }}>
                    <a
                      href="#"
                      style={{
                        color: "var(--color-text-muted)",
                        textDecoration: "none",
                      }}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "var(--color-accent-yellow)",
              }}
            >
              Stay Updated
            </h4>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              Get the latest features & offers in your inbox.
            </p>
            <form
              style={{
                display: "flex",
                gap: "0.5rem",
                marginTop: "1rem",
                flexWrap: "wrap",
              }}
            >
              <input
                type="email"
                placeholder="you@example.com"
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: `1px solid var(--color-text-muted)`,
                  backgroundColor: "var(--color-background-primary)",
                  color: "var(--color-text-normal)",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "var(--color-accent-yellow)",
                  color: "var(--color-background-secondary)",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.75rem 1.25rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.85rem",
            color: "var(--color-text-muted)",
          }}
        >
          <div>© {yearDisplay} Prisync. All rights reserved.</div>
          <div style={{ display: "flex", gap: "1rem" }}>
            {["Terms", "Privacy", "Compliance"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ color: "var(--color-text-muted)", textDecoration: "none" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
