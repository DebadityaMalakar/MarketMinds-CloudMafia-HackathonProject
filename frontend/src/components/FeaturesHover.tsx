const features = [
  {
    title: "Real-Time Competitor Tracking",
    subtitle: "Stay Ahead, Instantly",
    desc: "Monitor price drops, new product launches, and marketing shifts across your competitors in real time.",
    bg: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    accent: "Tracking",
  },
  {
    title: "Smart Price Suggestions",
    subtitle: "Maximize Margins",
    desc: "Leverage SmartPrice insights to stay competitive without underpricing. AI-backed pricing decisions for every SKU.",
    bg: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    accent: "Pricing",
  },
  {
    title: "Market Trend Dashboards",
    subtitle: "Visual Market Intelligence",
    desc: "Track TAM/SAM/SOM, competitor trends, and category-level growth with interactive visualizations.",
    bg: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    accent: "Analytics",
  },
  {
    title: "AI-Powered Alerts",
    subtitle: "Instant Actionable Signals",
    desc: "Get real-time alerts on anomalies like aggressive discounting, new rivals, or sudden market shifts — before it's too late.",
    bg: "https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    accent: "Alerts",
  },
];

const FeaturesHover = () => {
  return (
    <section className="py-16 bg-[var(--color-background-primary)] text-[var(--color-text-normal)] font-[Space Grotesk]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide">
            <span className="text-[var(--color-accent-blue)]">Core MarketMinds Capabilities</span>
          </h2>
          <div className="h-1 w-24 bg-[var(--color-accent-yellow)] rounded mt-3 mx-auto" />
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 border border-[var(--color-border-muted)] bg-[var(--color-background-secondary)]"
            >
              {/* Image */}
              <div className="aspect-[4/5] w-full relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${f.bg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-primary)]/80 via-transparent to-transparent" />

                {/* Text */}
                <div className="relative z-10 flex flex-col h-full p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase font-semibold tracking-widest text-[var(--color-accent-blue)]">
                      {f.accent}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 bg-[var(--color-accent-yellow)] text-[var(--color-background-primary)] text-xs px-2 py-1 rounded-md transition font-semibold tracking-wide">
                      Highlight
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-white mb-1">{f.title}</h3>
                    <p className="text-sm text-white/80 mb-3">{f.subtitle}</p>
                    <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <p className="text-sm text-white/90 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[var(--color-accent-blue)]/20 opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesHover;
