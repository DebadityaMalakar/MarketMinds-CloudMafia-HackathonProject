import { useState } from "react";

const faqs = [
  {
    q: "Can I track competitors in real time?",
    a: "Yes, our platform monitors competitors 24/7 and sends instant alerts for pricing changes, new product launches, and marketing activities.",
  },
  {
    q: "Is my company data safe?",
    a: "Absolutely. We use bank-grade encryption and secure cloud infrastructure to protect all your business data.",
  },
  {
    q: "Do you support multiple industries?",
    a: "Yes, you can track competitors across different sectors and manage them all from one dashboard.",
  },
  {
    q: "Do I need technical skills to use it?",
    a: "No, the platform is designed for ease of use — simply enter competitor names or websites, and our AI handles the rest.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#F8F4EF]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 uppercase tracking-wide bg-gradient-to-r from-[#FFB300] to-[#2B7A78] bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#FFB300] transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex justify-between items-center px-8 py-6 text-left focus:outline-none"
                aria-expanded={openIndex === idx}
                aria-controls={`faq-${idx}`}
              >
                <span className="font-bold text-xl text-[#4A3F35]">
                  {faq.q}
                </span>
                <span
                  className={`ml-4 text-2xl font-bold transition-transform duration-300 ${
                    openIndex === idx 
                      ? "rotate-45 text-[#FFB300]"
                      : "rotate-0 text-[#4A3F35]"
                  }`}
                >
                  +
                </span>
              </button>

              <div
                id={`faq-${idx}`}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === idx 
                    ? "max-h-40 opacity-100 pb-6"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-2">
                  <p className="text-lg text-[#6B6259] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;