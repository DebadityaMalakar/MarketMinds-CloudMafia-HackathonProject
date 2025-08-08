import React from "react";

// Mock framer-motion since it's not available
const motion = {
  div: ({ children, initial, whileInView, transition, viewport, whileHover, style, ...props }) => (
    <div {...props} style={style}>{children}</div>
  ),
  h2: ({ children, initial, whileInView, transition, viewport, ...props }) => (
    <h2 {...props}>{children}</h2>
  ),
  p: ({ children, initial, whileInView, transition, viewport, ...props }) => (
    <p {...props}>{children}</p>
  )
};

export default function PricingOptimizationSection() {
  const cards = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
      title: "Competitor price tracking and pricing optimization from a single dashboard.",
      description: "Import all your products with one click now.",
      accentColor: "#D4AF37", // Mustard yellow
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Google_Shopping_logo.png",
      title: "Automated competitor discovery and pricing intelligence.",
      description: "Get higher placement in product search results now.",
      accentColor: "#20B2AA", // Teal
    },
    {
      logo: "https://prisync.com/wp-content/uploads/elementor/thumbs/ecommerce-pricing-qa9xdo4cenw92xn90tys9ogwgqdof4anwb4wg4dmt8.jpg",
      title: "Competitor price monitoring and price management.",
      description: "Adjust prices automatically in bulk, and maximize profitability.",
      accentColor: "#8B4513", // Deep Earth Brown
    },
  ];

  return (
    <section className="py-16 bg-[#F8F4EF] text-black"> {/* Restored background color */}
      {/* Heading */}
      <div className="text-center mb-12 px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-4"
        >
          Pricing Optimization for Every Channel
        </motion.h2>
        <motion.p
          className="text-black max-w-3xl mx-auto text-lg"
        >
          Competitor Price Tracking & Price Monitoring and Dynamic Pricing will solve your profitability problems on all sales channels.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="w-full sm:w-[350px] bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            style={{ 
              transition: "all 0.3s ease",
              borderColor: "rgba(0, 0, 0, 0.1)"
            }}
          >
            <div className="h-16 mb-6 flex items-center">
              <img 
                src={card.logo} 
                alt="platform logo" 
                className="h-full object-contain max-w-full" 
                style={{ filter: "contrast(0.9)" }}
              />
            </div>
            <h3 className="font-bold text-xl mb-3 uppercase tracking-wide" style={{ color: card.accentColor }}>
              {card.title}
            </h3>
            <p className="text-black text-base flex-grow">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}