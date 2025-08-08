export default function PricingOptimizationSection() {
  const cards = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
      title:
        "Competitor price tracking and pricing optimization from a single dashboard.",
      description: "Import all your products with one click now.",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Google_Shopping_logo.png",
      title:
        "Automated competitor discovery and pricing intelligence.",
      description: "Get higher placement in product search results now.",
    },
    {
      logo: "https://prisync.com/wp-content/uploads/elementor/thumbs/ecommerce-pricing-qa9xdo4cenw92xn90tys9ogwgqdof4anwb4wg4dmt8.jpg",
      title:
        "Competitor price monitoring and price management.",
      description:
        "Adjust prices automatically in bulk, and maximize profitability.",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "var(--color-background-primary)",
        color: "var(--color-text-normal)",
        padding: "3rem 1rem",
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Pricing Optimization for Every Channel
        </h2>
        <p
          style={{
            color: "var(--color-text-muted)",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Competitor Price Tracking & Price Monitoring and Dynamic Pricing will
          solve your profitability problems on all sales channels.
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "var(--color-background-secondary)",
              border: `1px solid var(--color-accent-blue)`,
              borderRadius: "8px",
              padding: "1.5rem",
              width: "300px",
              boxShadow: `0 4px 8px rgba(0, 0, 0, 0.2)`,
              textAlign: "center",
              transition: "background-color 0.3s ease, border-color 0.3s ease",
            }}
          >
            <img
              src={card.logo}
              alt="logo"
              style={{ height: "40px", marginBottom: "1rem" }}
            />
            <p
              style={{
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "var(--color-text-normal)",
              }}
            >
              {card.title}
            </p>
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.95rem",
              }}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
