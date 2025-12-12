"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Sprout, Wheat } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "farmer">("user");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    localStorage.setItem("farmora_user", JSON.stringify({ ...formData, role }));
    router.push("/marketplace");
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans selection:bg-[#D2F34C] selection:text-stone-900">
      
      {/* LEFT SIDE: Static Visuals */}
      <div className="hidden lg:flex lg:w-5/12 relative bg-stone-900 flex-col justify-between p-12 overflow-hidden text-white">
        
        {/* STATIC GLOW: No animation, just a fixed beautiful light leak */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#D2F34C] rounded-full blur-[180px] opacity-15 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D2F34C] rounded-full blur-[200px] opacity-5 pointer-events-none"></div>

        {/* Brand Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="h-8 w-8 bg-[#D2F34C] rounded-lg flex items-center justify-center text-stone-900 shadow-[0_0_15px_rgba(210,243,76,0.3)]">
            <Sprout size={20} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Farmora</span>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-8">
          <h2 className="text-5xl font-light tracking-tight leading-tight">
            Cultivate <br />
            <span className="font-serif italic text-[#D2F34C]">Precision.</span>
          </h2>

          <div className="relative pl-6 border-l-2 border-[#D2F34C]/50">
            <p className="text-2xl font-medium text-stone-200 leading-relaxed">
              "నేల తల్లిని నమ్ముకున్న వాడు ఎప్పుడూ చెడిపోడు."
            </p>
            <p className="mt-3 text-xs font-bold text-[#D2F34C] uppercase tracking-[0.2em] opacity-80">
              Farmer's Proverb
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-stone-500 text-xs flex justify-between">
          <p>© 2024 Farmora Inc.</p>
        </div>
      </div>

      {/* RIGHT SIDE: Minimal Form */}
      <div className="w-full lg:w-7/12 flex flex-col relative bg-white">
        
        {/* Back Button */}
        <div className="absolute top-8 left-8 z-20">
          <a href="/" className="flex items-center gap-2 text-sm font-medium text-stone-400 hover:text-stone-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </a>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center px-8 sm:px-12 lg:px-24">
          <div className="w-full max-w-md space-y-12">
            
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-stone-900">Sign In</h1>
              <p className="text-stone-500">Access your dashboard.</p>
            </div>

            {/* Role Switcher */}
            <div className="flex p-1 bg-stone-50 border border-stone-100 rounded-lg w-full">
              <button
                onClick={() => setRole("user")}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                  role === "user" ? "bg-white text-stone-900 shadow-sm border border-stone-100" : "text-stone-400 hover:text-stone-600"
                }`}
              >
                Consumer
              </button>
              <button
                onClick={() => setRole("farmer")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${
                  role === "farmer" ? "bg-white text-stone-900 shadow-sm border border-stone-100" : "text-stone-400 hover:text-stone-600"
                }`}
              >
                <Wheat size={14} />
                Farmer
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-8">
                
                {/* Email Input: Just a line */}
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="peer block w-full border-b border-stone-200 bg-transparent py-2.5 text-stone-900 placeholder-transparent focus:border-stone-900 focus:outline-none transition-colors"
                    placeholder="Email Address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-xs font-medium text-stone-400 transition-all 
                               peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 
                               peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-stone-900"
                  >
                    Email Address
                  </label>
                </div>

                {/* Password Input: Just a line */}
                <div className="relative group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="peer block w-full border-b border-stone-200 bg-transparent py-2.5 text-stone-900 placeholder-transparent focus:border-stone-900 focus:outline-none transition-colors"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-xs font-medium text-stone-400 transition-all 
                               peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 
                               peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-stone-900"
                  >
                    Password
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900" />
                  <span className="text-sm text-stone-500">Remember me</span>
                </label>
                <a href="#" className="text-sm font-medium text-stone-400 hover:text-stone-900 transition-colors">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-stone-900 px-8 py-4 text-white hover:bg-stone-800 hover:shadow-lg transition-all active:scale-[0.99]"
              >
                <span className="font-bold text-sm">Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center">
              <p className="text-stone-400 text-sm">
                New here?{" "}
                <a href="/sign-up" className="font-bold text-stone-900 hover:underline hover:text-[#D2F34C] transition-colors decoration-2 underline-offset-4">
                  Create account
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
