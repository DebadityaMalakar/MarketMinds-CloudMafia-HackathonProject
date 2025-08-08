import React, { useState } from "react";
import CountUp from "react-countup";

const plans = [
  {
    key: "basic",
    name: "Basic",
    tagline: "For solo shop owners",
    monthly: 0,
    annual: 0,
    features: [
      "GST Billing",
      "Inventory Tracking",
      "Basic Reports",
      "Single user access",
    ],
  },
  {
    key: "pro",
    name: "Pro",
    tagline: "Growing businesses",
    monthly: 499,
    annual: 4999,
    features: [
      "Everything in Basic",
      "AI Pricing Suggestions",
      "WhatsApp / Voice Orders",
      "Multi-user (up to 5)",
      "Priority Support",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    tagline: "Scale & team-ready",
    monthly: 1499,
    annual: 14999,
    features: [
      "Everything in Pro",
      "Unlimited users",
      "Dedicated account support",
      "Custom SLAs",
      "Multi-branch management",
    ],
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const isMonthly = billingCycle === "Monthly";

  return (
    <section
      style={{
        backgroundColor: "var(--color-background-primary)",
        color: "var(--color-text-normal)",
        padding: "6rem 1rem",
        fontFamily: "var(--font-family, sans-serif)",
      }}
    >
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "800", textTransform: "uppercase" }}>
            Transparent Pricing
          </h2>
          <p
            style={{
              color: "var(--color-text-muted)",
              marginTop: "1rem",
              maxWidth: "40rem",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "1.125rem",
            }}
          >
            Choose a plan that fits your business scale. No hidden charges — built for flexibility.
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "var(--color-background-secondary)",
              padding: "0.25rem",
              borderRadius: "9999px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            {["Monthly", "Annual"].map((tab) => (
              <button
                key={tab}
                onClick={() => setBillingCycle(tab)}
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "9999px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  backgroundColor:
                    billingCycle === tab ? "var(--color-accent-yellow)" : "transparent",
                  color:
                    billingCycle === tab
                      ? "#fff"
                      : "var(--color-text-normal)",
                  boxShadow:
                    billingCycle === tab ? "0 2px 6px rgba(0,0,0,0.2)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div
          style={{
            display: "grid",
            gap: "2.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {plans.map((plan) => {
            const price = isMonthly ? plan.monthly : plan.annual;
            const displayCycle = isMonthly ? "/month" : "/year";
            const isPopular = plan.key === "pro";

            return (
              <div
                key={plan.key}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  padding: "2rem",
                  borderRadius: "12px",
                  backgroundColor: "var(--color-background-secondary)",
                  border: isPopular
                    ? `2px solid var(--color-accent-yellow)`
                    : `1px solid var(--color-text-muted)`,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                  transition: "all 0.3s ease",
                }}
                className="hover:shadow-lg"
              >
                {isPopular && (
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      backgroundColor: "var(--color-accent-yellow)",
                      color: "#fff",
                      padding: "0.25rem 0.75rem",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      borderRadius: "9999px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.75rem", fontWeight: "700" }}>{plan.name}</h3>
                  <p style={{ marginTop: "0.25rem", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                    {plan.tagline}
                  </p>

                  <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                    <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--color-accent-blue)" }}>
                      <CountUp start={0} end={price} duration={1} prefix="₹" separator="," />
                    </div>
                    <div style={{ color: "var(--color-text-normal)", fontSize: "1rem" }}>
                      {displayCycle}
                    </div>
                  </div>

                  {!isMonthly && plan.monthly > 0 && (
                    <div style={{ marginTop: "0.25rem", fontSize: "0.85rem", color: "var(--color-accent-yellow)" }}>
                      ₹{Math.round((plan.annual / 12) * 100) / 100}/month equivalent
                    </div>
                  )}

                  <ul style={{ marginTop: "1.5rem", listStyle: "none", paddingLeft: 0 }}>
                    {plan.features.map((f, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          fontSize: "0.95rem",
                          color: "var(--color-text-normal)",
                        }}
                      >
                        <span style={{ color: "var(--color-accent-yellow)", marginTop: "0.2rem" }}>✔</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <button
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      backgroundColor: isPopular
                        ? "var(--color-accent-yellow)"
                        : "var(--color-accent-blue)",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    {price === 0 ? "Get Started" : `Subscribe ₹${price}`}
                  </button>
                  <div
                    style={{
                      marginTop: "0.5rem",
                      textAlign: "center",
                      fontSize: "0.75rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {isMonthly
                      ? "Billed monthly. Cancel anytime."
                      : "Billed annually. Save more."}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div
          style={{
            marginTop: "3.5rem",
            textAlign: "center",
            fontSize: "0.85rem",
            color: "var(--color-text-muted)",
            maxWidth: "40rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <p>
            All prices in INR (₹). GST may apply. Contact us for custom pricing, integrations, and multi-branch support.
          </p>
        </div>
      </div>
    </section>
  );
}
