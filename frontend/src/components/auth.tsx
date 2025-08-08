import React, { useEffect, useState } from "react";
import { Mail, Phone, Lock, User, Facebook, Chrome, X } from "react-feather";
import { initTheme } from "../utils/theme";

const Toast = ({ message, type = "error", onClose }) => {
  const bgColor =
    type === "error"
      ? "bg-red-500"
      : type === "success"
      ? "bg-green-500"
      : "bg-gray-700";

  return (
    <div
      className={`${bgColor} text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 animate-slide-in`}
    >
      <span className="flex-1">{message}</span>
      <button onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // {message, type}

  useEffect(() => {
    if(document.body){
      document.body.classList.add("bg-[var(--color-background-primary)]");
    }
    initTheme();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

const sendOtp = async () => {
  if (!formData.email) {
    showToast("Please enter your email first.", "error");
    return;
  }

  setLoading(true);
  try {
    const res = await fetch("http://10.153.28.114:5000/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email, password: formData.password, name: formData.name }), // send email here
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to send OTP");
    }

    showToast("OTP sent successfully to your email!", "success");
  } catch (err) {
    //@ts-ignore
    showToast(err.message || "Failed to send OTP", "error");
  } finally {
    setLoading(false);
  }
};



  const handleSubmit = async () => {
    setLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const res = await fetch(`http://10.153.28.114:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Something went wrong");
      }

      // On success
      res.json().then((data) => {
        showToast(isLogin ? "Login successful!" : "Registration successful!", "success");
        localStorage.setItem("token", data.token);
      });
      window.location.href = "/products";
    } catch (err: any) {
      showToast(err.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-[var(--color-background-primary)] px-4 font-manrope">
      {/* Toast container */}
      <div className="absolute top-4 right-4 space-y-2 z-50">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>

      <div className="bg-[var(--color-surface)] text-[var(--color-text-normal)] rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col gap-6 border border-[var(--color-border-muted)]">
        {/* Logo & Tagline */}
        <div className="text-center">
          <img src="/logo.png" alt="MarketMinds Logo" className="h-14 mx-auto mb-2" />
          <h2 className="text-sm font-medium text-[var(--color-accent-blue)]">
            Your AI-powered competitive intelligence assistant
          </h2>
        </div>

        {/* Toggle Tabs */}
        <div className="flex justify-center gap-8 border-b border-[var(--color-border-muted)] pb-2">
          <button
            onClick={() => setIsLogin(true)}
            className={`pb-1 font-semibold transition-colors ${
              isLogin
                ? "border-b-2 border-[var(--color-accent-yellow)] text-[var(--color-text-normal)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-normal)]"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`pb-1 font-semibold transition-colors ${
              !isLogin
                ? "border-b-2 border-[var(--color-accent-yellow)] text-[var(--color-text-normal)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-normal)]"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3">
          {!isLogin && (
            <div className="flex items-center gap-2 p-3 rounded-md bg-[var(--color-background-primary)] border border-[var(--color-border-muted)]">
              <User size={18} className="text-[var(--color-accent-blue)]" />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="bg-transparent outline-none flex-1"
              />
            </div>
          )}

          <div className="flex items-center gap-2 p-3 rounded-md bg-[var(--color-background-primary)] border border-[var(--color-border-muted)]">
            <Mail size={18} className="text-[var(--color-accent-blue)]" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-transparent outline-none flex-1"
            />
          </div>

          {!isLogin && (<div className="flex items-center gap-2 p-3 rounded-md bg-[var(--color-background-primary)] border border-[var(--color-border-muted)]">
            <Phone size={18} className="text-[var(--color-accent-blue)]" />
            <input
              type="tel"
              placeholder="Phone (+91)"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="bg-transparent outline-none flex-1"
            />
          </div>)}

          <div className="flex items-center gap-2 p-3 rounded-md bg-[var(--color-background-primary)] border border-[var(--color-border-muted)]">
            <Lock size={18} className="text-[var(--color-accent-blue)]" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="bg-transparent outline-none flex-1"
            />
          </div>

          {!isLogin && (
            <div className="flex items-center gap-2 p-3 rounded-md bg-[var(--color-background-primary)] border border-[var(--color-border-muted)]">
              <User size={18} className="text-[var(--color-accent-blue)]" />
              <input
                type="text"
                placeholder="OTP (optional)"
                value={formData.otp}
                onChange={(e) => handleChange("otp", e.target.value)}
                className="bg-transparent outline-none flex-1"
              />
              <button
                onClick={sendOtp}
                disabled={loading}
                className="ml-2 px-3 py-1 rounded-md bg-[var(--color-accent-yellow)] text-[var(--color-background-primary)] font-semibold hover:brightness-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send OTP
              </button>
            </div>
          )}


          {/* Primary Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold bg-[var(--color-accent-yellow)] text-[var(--color-background-primary)] hover:brightness-105 transition ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>

          {/* Social Auth */}
          <div className="flex gap-3">
            <button className="flex items-center justify-center gap-2 flex-1 py-2 rounded-md border border-[var(--color-border-muted)] hover:bg-[var(--color-surface-highlight)] transition">
              <Chrome size={18} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 flex-1 py-2 rounded-md bg-[#1877F2] text-white hover:brightness-105 transition">
              <Facebook size={18} /> Facebook
            </button>
          </div>

          {/* Links */}
          <div className="flex justify-between text-sm">
            <a href="#" className="text-[var(--color-accent-blue)] hover:underline">
              Continue as Guest
            </a>
            <a href="#" className="text-[var(--color-accent-blue)] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Terms */}
          <p className="text-xs text-center text-[var(--color-text-muted)]">
            By continuing, you agree to the{" "}
            <a href="#" className="text-[var(--color-accent-blue)] hover:underline">
              Terms
            </a>{" "}
            &{" "}
            <a href="#" className="text-[var(--color-accent-blue)] hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
