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

const SubscriptionPricingPage = () => {
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const isMonthly = billingCycle === "Monthly";

  return (
    <section className="py-24 bg-[#F8F4EF] text-[#4A3F35] font-manrope">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase text-[#4A3F35]">
            Transparent Pricing for Vyapari+
          </h2>
          <p className="text-[#6B6259] mt-4 max-w-2xl mx-auto text-lg">
            Choose a plan that fits your shop's scale and ambition. Built for Indian businesses, with no hidden charges.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-14">
          <div className="relative inline-flex rounded-full bg-[#EFE8DD] p-1 shadow-md">
            {["Monthly", "Annual"].map((tab) => (
              <button
                key={tab}
                onClick={() => setBillingCycle(tab)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  billingCycle === tab
                    ? "bg-[#FFB300] text-white shadow"
                    : "text-[#4A3F35] hover:text-[#FFB300]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid gap-10 sm:grid-cols-1 lg:grid-cols-3">
          {plans.map((plan) => {
            const price = isMonthly ? plan.monthly : plan.annual;
            const displayCycle = isMonthly ? "/month" : "/year";
            const isPopular = plan.key === "pro";

            return (
              <div
                key={plan.key}
                className={`relative flex flex-col p-8 rounded-xl bg-white shadow-sm border ${
                  isPopular
                    ? "border-[#FFB300] ring-2 ring-[#FFB300]"
                    : "border-gray-200"
                } transition hover:shadow-lg`}
              >
                {isPopular && (
                  <div className="absolute top-4 right-4 bg-[#FFB300] text-white px-3 py-1 text-xs font-bold rounded-full shadow-sm">
                    Most Popular
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-3xl font-bold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-[#6B6259]">{plan.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <div className="text-4xl font-extrabold text-[#2B7A78]">
                      <CountUp 
                        start={0} 
                        end={price} 
                        duration={1} 
                        prefix="₹" 
                        separator="," 
                        decimals={0}
                      />
                    </div>
                    <div className="text-[#4A3F35] text-lg">{displayCycle}</div>
                  </div>

                  {!isMonthly && plan.monthly > 0 && (
                    <div className="mt-1 text-sm text-[#FFB300]">
                      ₹{Math.round((plan.annual / 12) * 100) / 100}/month equivalent
                    </div>
                  )}

                  <ul className="mt-6 space-y-3 text-[#4A3F35]">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#FFB300] mt-1">✔</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    className={`w-full py-3 rounded-md font-semibold transition-all ${
                      isPopular
                        ? "bg-[#FFB300] text-white hover:brightness-105"
                        : "bg-[#2B7A78] text-white hover:bg-[#256c69]"
                    }`}
                  >
                    {price === 0 ? "Get Started" : `Subscribe ₹${price}`}
                  </button>
                  <div className="mt-2 text-center text-xs text-[#6B6259]">
                    {isMonthly ? "Billed monthly. Cancel anytime." : "Billed annually. Save more."}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-14 text-center text-sm text-[#6B6259] max-w-2xl mx-auto">
          <p>
            All prices in INR (₹). GST may apply. Contact us for custom pricing, integrations, and multi-branch support.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPricingPage;