import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#4A3F35] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[rgba(255,255,255,0.1)]">
          {/* Branding */}
          <div className="space-y-4">
            <div className="text-2xl font-extrabold text-[#FFB300] uppercase tracking-wide">
              MarketMinds
            </div>
            <p className="text-sm text-[#F8F4EF]">
              AI-powered competitive intelligence for data-driven decision making. Stay ahead in every market move.
            </p>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex -space-x-2">
                {[3, 5, 7].map((img) => (
                  <img
                    key={img}
                    src={`https://i.pravatar.cc/40?img=${img}`}
                    alt="user"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-xs text-[#F8F4EF] opacity-70">500+ businesses tracking competitors</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#FFB300]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[#F8F4EF]">
              {["Features", "Pricing", "Case Studies", "API", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-[#2B7A78] transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#FFB300]">Resources</h4>
            <ul className="space-y-2 text-sm text-[#F8F4EF]">
              {["Competitor Analysis Guide", "Pricing Strategies", "API Documentation", "Blog", "Support"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#2B7A78] transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-2 text-[#FFB300]">Get Market Alerts</h4>
            <p className="text-sm text-[#F8F4EF]">Receive competitor updates and pricing insights.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@company.com"
                className="flex-1 px-4 py-3 rounded-md bg-white border border-gray-200 placeholder:text-gray-500 text-sm focus:ring-2 focus:ring-[#FFB300] outline-none text-black"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#FFB300] text-[#4A3F35] rounded-md font-semibold hover:bg-[#E6A100] transition"
              >
                Subscribe
              </button>
            </form>
            <div className="text-sm text-[#F8F4EF] mt-2">
              <p>Email: <a href="mailto:intel@marketminds.ai" className="hover:text-[#2B7A78]">intel@marketminds.ai</a></p>
              <p>Phone: <a href="tel:+919876543210" className="hover:text-[#2B7A78]">+91 98765 43210</a></p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#F8F4EF] opacity-80">
          <div className="flex items-center gap-4">
            <div>© {new Date().getFullYear()} MarketMinds. All rights reserved.</div>
            <div className="flex gap-4">
              {["Terms", "Privacy", "GDPR"].map((item) => (
                <a key={item} href="#" className="hover:text-[#2B7A78] transition">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-5">
            {["twitter", "linkedin", "instagram"].map((platform) => (
              <a 
                key={platform} 
                href="#" 
                aria-label={`${platform} social media`}
                className="hover:text-[#2B7A78] transition"
              >
                <span className="sr-only">{platform}</span>
                <i className={`fab fa-${platform} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;