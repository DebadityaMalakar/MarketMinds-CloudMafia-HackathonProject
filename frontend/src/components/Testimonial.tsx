import React, { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Retail Shop Owner",
    avatar: "https://i.pravatar.cc/150?img=3",
    feedback:
      "Vyapari+ has made GST billing effortless for my store. I save hours every week and my customers love the instant invoices.",
  },
  {
    name: "Aishwarya Sharma",
    role: "Wholesale Distributor",
    avatar: "https://i.pravatar.cc/150?img=5",
    feedback:
      "The inventory alerts are a lifesaver! I never run out of my fast-moving products anymore.",
  },
  {
    name: "Vikram Singh",
    role: "Electronics Store Owner",
    avatar: "https://i.pravatar.cc/150?img=8",
    feedback:
      "I can take orders directly from WhatsApp and it updates stock automatically. Game changer for my business!",
  },
  {
    name: "Priya Verma",
    role: "Grocery Store Owner",
    avatar: "https://i.pravatar.cc/150?img=9",
    feedback:
      "Vyapari+ AI pricing suggestions have boosted my margins without losing customers.",
  },
  {
    name: "Amit Patel",
    role: "Pharmacy Owner",
    avatar: "https://i.pravatar.cc/150?img=11",
    feedback:
      "GST compliance and filing is now stress-free. I get reminders and can file directly from the app.",
  },
  {
    name: "Neha Gupta",
    role: "Bakery Owner",
    avatar: "https://i.pravatar.cc/150?img=12",
    feedback:
      "The dashboard gives me a clear view of sales, expenses, and profits at a glance. Love the clean design.",
  },
];

const TestimonialCard = ({ name, role, avatar, feedback }) => (
  <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 w-80 min-w-[20rem] h-[18rem] flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-xl mx-2">
    {/* Header */}
    <div className="flex items-center gap-4 mb-4">
      <img
        src={avatar}
        alt={name}
        className="w-16 h-16 rounded-full border-2 border-teal-600 object-cover"
      />
      <div>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>

    {/* Feedback */}
    <p className="text-gray-700 italic leading-relaxed overflow-hidden text-ellipsis line-clamp-5">
      "{feedback}"
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
    <section className="py-16 bg-[#F8F4EF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase text-center mb-14 bg-gradient-to-r from-[#FFB300] to-[#2B7A78] bg-clip-text text-transparent tracking-wide">
          What Our Users Say
        </h2>

        <div className="relative">
          <div
            ref={marqueeRef}
            className="flex gap-4 animate-[scroll_30s_linear_infinite] py-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={`${t.name}-${i}`} {...t} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .animate-[scroll_30s_linear_infinite] {
            animation: none;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonial;