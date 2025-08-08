import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { Fragment } from "react/jsx-runtime";

const Landing = () => {
  return (
    <Fragment>
      <Navbar />
      <section
        id="top"
        className="pt-28 pb-20 bg-bg-primary text-text-primary font-sans"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight uppercase tracking-wide">
              <span className="text-accent-1">
                MarketMinds
              </span>{" "}
              — Your AI-Powered Competitive Intelligence Platform
            </h1>
            <p className="mb-8 text-lg font-medium text-text-secondary">
              Track competitors in real time, optimize your pricing, and stay ahead in every market move — all in one intelligent dashboard.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              className="btn-primary px-8 py-3 text-lg transition-all duration-200"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.backgroundColor = "var(--color-accent-1-dark)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.backgroundColor = "var(--color-accent-1)";
              }}
            >
              Get Started
            </button>
            <button 
              className="btn-secondary px-8 py-3 text-lg transition-all duration-200"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.backgroundColor = "var(--color-accent-2-light)";
                e.currentTarget.style.color = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.color = "var(--color-accent-2)";
              }}
            >
              Learn More
            </button>
          </motion.div>

          {/* Hero Visualization Placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 w-full max-w-5xl bg-surface rounded-xl shadow-md p-6 border border-divider"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <div 
              className="h-64 bg-gradient-to-r from-accent-2/20 to-accent-1/20 rounded-lg flex items-center justify-center transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundImage = "linear-gradient(to right, var(--color-accent-2/30), var(--color-accent-1/30))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundImage = "";
              }}
            >
              <p className="text-text-secondary font-medium">
                Interactive Market Intelligence Dashboard Preview
              </p>
            </div>
            <div className="mt-4 flex justify-center gap-8">
              {['Market Trends', 'Competitor Benchmarks', 'Pricing Insights'].map((item) => (
                <div 
                  key={item} 
                  className="flex items-center cursor-pointer"
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector('div').style.transform = "scale(1.2)";
                    e.currentTarget.querySelector('span').style.fontWeight = "600";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector('div').style.transform = "";
                    e.currentTarget.querySelector('span').style.fontWeight = "";
                  }}
                >
                  <div className="w-3 h-3 rounded-full bg-accent-1 mr-2 transition-transform duration-200"></div>
                  <span className="label text-sm transition-all duration-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;