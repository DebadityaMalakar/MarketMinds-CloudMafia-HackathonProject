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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      style={{
        backgroundColor: "var(--color-background-primary)",
        color: "var(--color-text-normal)",
        padding: "4rem 1rem",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "3rem",
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "var(--color-accent-blue)",
        }}
      >
        Frequently Asked Questions
      </h2>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "var(--color-background-secondary)",
              border: `1px solid var(--color-accent-blue)`,
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              marginBottom: "1rem",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <button
              onClick={() => toggleFAQ(idx)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 1.5rem",
                background: "transparent",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                color: "var(--color-accent-blue)",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              <span>{faq.q}</span>
              <span
                style={{
                  transform: openIndex === idx ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease, color 0.3s ease",
                  fontSize: "1.5rem",
                  color:
                    openIndex === idx
                      ? "var(--color-accent-yellow)"
                      : "var(--color-text-normal)",
                }}
              >
                +
              </span>
            </button>

            <div
              style={{
                maxHeight: openIndex === idx ? "200px" : "0",
                overflow: "hidden",
                padding: openIndex === idx ? "0 1.5rem 1rem" : "0 1.5rem",
                color: "var(--color-text-muted)",
                fontSize: "1rem",
                lineHeight: "1.5",
                transition: "max-height 0.3s ease, padding 0.3s ease",
              }}
            >
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
