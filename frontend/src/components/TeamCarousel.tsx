import React, { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { motion } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const defaultMembers = [
  {
    id: "ceo",
    name: "Aarav Sharma",
    role: "CEO & Founder",
    image: "https://i.pravatar.cc/300?img=13",
    bio: "Visionary leader driving MarketMinds' mission to revolutionize competitive intelligence with AI-powered insights.",
  },
  {
    id: "cto",
    name: "Neha Patel",
    role: "CTO",
    image: "https://i.pravatar.cc/300?img=12",
    bio: "Architect of our real-time data collection engine and machine learning pipelines that power our analytics.",
  },
  {
    id: "product",
    name: "Rahul Verma",
    role: "Product Director",
    image: "https://i.pravatar.cc/300?img=47",
    bio: "Leads product strategy to deliver actionable competitor insights that drive business growth.",
  },
  {
    id: "data",
    name: "Priya Khanna",
    role: "Data Science Lead",
    image: "https://i.pravatar.cc/300?img=5",
    bio: "Develops our proprietary algorithms that detect pricing trends and competitor strategies.",
  },
];

const TeamCarousel = ({
  members = defaultMembers,
  cardWidth = 280,
  cardHeight = 360,
  visibleCards = 1,
  sideCardScale = 0.9,
  sideCardOpacity = 0.6,
  grayscaleEffect = false,
  autoPlay = 4000,
  pauseOnHover = true,
  showArrows = true,
  showDots = true,
}) => {
  const total = members.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hovering, setHovering] = useState(false);

  const wrap = (i) => (i + total) % total;

  const paginate = useCallback(
    (delta) => {
      if (total === 0) return;
      setDirection(delta);
      setCurrentIndex((prev) => wrap(prev + delta));
    },
    [total]
  );

  useEffect(() => {
    if (autoPlay <= 0) return;
    if (hovering && pauseOnHover) return;
    const iv = setInterval(() => paginate(1), autoPlay);
    return () => clearInterval(iv);
  }, [autoPlay, paginate, hovering, pauseOnHover]);

  const getVariantStyles = (posIndex) => {
    const diff = wrap(posIndex - currentIndex);
    if (diff === 0) {
      return {
        zIndex: 10,
        opacity: 1,
        scale: 1,
        x: 0,
        filter: "none",
        pointerEvents: "auto",
        transition: { duration: 0.5 },
      };
    }
    if (diff === 1) {
      return {
        zIndex: 5,
        opacity: sideCardOpacity,
        scale: sideCardScale,
        x: cardWidth * 0.7,
        filter: grayscaleEffect ? "grayscale(100%)" : "none",
        pointerEvents: "auto",
        transition: { duration: 0.5 },
      };
    }
    if (diff === total - 1) {
      return {
        zIndex: 5,
        opacity: sideCardOpacity,
        scale: sideCardScale,
        x: -cardWidth * 0.7,
        filter: grayscaleEffect ? "grayscale(100%)" : "none",
        pointerEvents: "auto",
        transition: { duration: 0.5 },
      };
    }
    return {
      zIndex: 0,
      opacity: 0,
      scale: 0.85,
      x: direction > 0 ? cardWidth * 2 : -cardWidth * 2,
      pointerEvents: "none",
      filter: grayscaleEffect ? "grayscale(100%)" : "none",
      transition: { duration: 0.5 },
    };
  };

  return (
    <div
      className="relative w-full py-16 flex flex-col items-center bg-[#F8F4EF]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center uppercase tracking-wide text-[#4A3F35]">
        Meet the <span className="text-[#FFB300]">MarketMinds</span> Team
      </h2>

      <div className="relative w-full max-w-4xl flex items-center justify-center">
        {showArrows && (
          <>
            <button
              onClick={() => paginate(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-[#4A3F35]/20 p-2 rounded-full shadow hover:scale-105 transition z-20"
              aria-label="Previous team member"
            >
              <ChevronLeft className="w-5 h-5 text-[#2B7A78]" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-[#4A3F35]/20 p-2 rounded-full shadow hover:scale-105 transition z-20"
              aria-label="Next team member"
            >
              <ChevronRight className="w-5 h-5 text-[#2B7A78]" />
            </button>
          </>
        )}

        <div className="w-full h-[420px] relative flex items-center justify-center">
          {members.map((member, idx) => {
            const variant = getVariantStyles(idx);
            const isActive = idx === currentIndex;
            return (
              <motion.div
                key={member.id}
                initial={variant}
                animate={variant}
                exit={variant}
                className={cn(
                  "absolute rounded-xl overflow-hidden bg-white shadow-lg flex flex-col border-2",
                  isActive
                    ? "border-[#FFB300] shadow-md"
                    : "border-transparent"
                )}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (!isActive) paginate(idx > currentIndex ? 1 : -1);
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-[60%]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col bg-white">
                    <h3 className="text-lg font-bold text-[#4A3F35]">
                      {member.name}
                    </h3>
                    <p className="text-sm uppercase text-[#2B7A78] font-semibold tracking-wide mt-1">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm text-[#6B6259] flex-1 overflow-auto">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {showDots && (
        <div className="flex gap-3 mt-8">
          {members.map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i - currentIndex)}
              className={cn(
                "w-3 h-3 rounded-full transition",
                currentIndex === i
                  ? "bg-[#FFB300] scale-110"
                  : "bg-[#D9D9D9] hover:bg-[#A8A8A8]"
              )}
              aria-label={`Go to team member ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamCarousel;