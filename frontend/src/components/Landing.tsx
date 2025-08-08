import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { Fragment } from "react/jsx-runtime";
const Landing = () => {
  return (
    <Fragment>
        <Navbar />
        <section
        id="top"
        className="pt-28 pb-20 bg-[var(--color-background-primary)] text-[var(--color-text-normal)] font-[Space Grotesk]"
        >
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
            {/* Heading */}
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
            >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight uppercase">
                <span className="text-[var(--color-accent-yellow)]">
                MarketMinds
                </span>{" "}
                — Your AI-Powered Competitive Intelligence Platform
            </h1>
            <p className="mb-8 text-lg font-medium text-[var(--color-text-muted)]">
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
            <button className="bg-[var(--color-accent-yellow)] text-[var(--color-background-primary)] px-8 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform hover:shadow-lg">
                Get Started
            </button>
            <button className="bg-[var(--color-surface)] border border-[var(--color-border-muted)] text-[var(--color-accent-blue)] px-8 py-3 rounded-xl font-semibold shadow-sm hover:bg-[var(--color-surface-highlight)] hover:scale-105 transition-transform">
                Learn More
            </button>
            </motion.div>
        </div>
        </section>
    </Fragment>
  );
};

export default Landing;
