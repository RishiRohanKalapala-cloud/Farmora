"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Sprout, Wheat, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "farmer">("user");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return;
    localStorage.setItem("farmora_user", JSON.stringify({ ...formData, role }));
    router.push("/marketplace");
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans selection:bg-[#D2F34C] selection:text-stone-900">
      
      {/* LEFT SIDE: Brand & Vision 
          Kept dark to match the Sign In page for consistency.
      */}
      <div className="hidden lg:flex lg:w-5/12 relative bg-stone-900 flex-col justify-between p-12 overflow-hidden text-white">
        
        {/* STATIC GLOW: Fixed, premium light leaks */}
        <div className="absolute top-[-20%] left-[-20%] w-[700px] h-[700px] bg-[#D2F34C] rounded-full blur-[250px] opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#D2F34C] rounded-full blur-[150px] opacity-5 pointer-events-none"></div>

        {/* Brand Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="h-8 w-8 bg-[#D2F34C] rounded-lg flex items-center justify-center text-stone-900 shadow-[0_0_15px_rgba(210,243,76,0.3)]">
            <Sprout size={20} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Farmora</span>
        </div>

        {/* Content: "Join the movement" theme */}
        <div className="relative z-10 space-y-8">
          <h2 className="text-5xl font-light tracking-tight leading-tight">
            Sow the seeds of <br />
            <span className="font-serif italic text-[#D2F34C]">Innovation.</span>
          </h2>

          <div className="relative pl-6 border-l-2 border-[#D2F34C]/50">
            <p className="text-xl font-medium text-stone-300 leading-relaxed">
              Join a network of 5,000+ modern farmers and consumers reshaping the harvest.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[#D2F34C]">
              <Leaf size={16} />
              <span className="text-xs font-bold uppercase tracking-widest opacity-90">
                Sustainable Future
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-stone-500 text-xs flex justify-between">
          <p>© 2024 Farmora Inc.</p>
          <p>Privacy & Terms</p>
        </div>
      </div>

      {/* RIGHT SIDE: The Form */}
      <div className="w-full lg:w-7/12 flex flex-col relative bg-white">
        
        {/* Back Button */}
        <div className="absolute top-8 left-8 z-20">
          <a href="/" className="flex items-center gap-2 text-sm font-medium text-stone-400 hover:text-stone-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </a>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center px-8 sm:px-12 lg:px-24">
          <div className="w-full max-w-md space-y-10">
            
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-stone-900">Create Account</h1>
              <p className="text-stone-500">Begin your journey with Farmora.</p>
            </div>

            {/* Role Switcher (Pill Shape) */}
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

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Full Name Input */}
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="peer block w-full border-b border-stone-200 bg-transparent py-2.5 text-stone-900 placeholder-transparent focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="Full Name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 -top-3.5 text-xs font-medium text-stone-400 transition-all 
                             peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 
                             peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-stone-900"
                >
                  Full Name
                </label>
              </div>

              {/* Email Input */}
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

              {/* Password Input */}
              <div className="relative group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="peer block w-full border-b border-stone-200 bg-transparent py-2.5 text-stone-900 placeholder-transparent focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="Create Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-xs font-medium text-stone-400 transition-all 
                             peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 
                             peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-stone-900"
                >
                  Create Password
                </label>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center mt-0.5">
                    <input type="checkbox" className="peer appearance-none h-4 w-4 border border-stone-300 rounded bg-white checked:bg-stone-900 checked:border-stone-900 transition-all" />
                    <svg className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-stone-500 leading-snug">
                    I agree to the <span className="font-semibold text-stone-900 hover:underline">Terms</span> and <span className="font-semibold text-stone-900 hover:underline">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-stone-900 px-8 py-4 text-white hover:bg-stone-800 hover:shadow-lg transition-all active:scale-[0.99]"
              >
                <span className="font-bold text-sm">Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center">
              <p className="text-stone-400 text-sm">
                Already have an account?{" "}
                <a href="/sign-in" className="font-bold text-stone-900 hover:underline hover:text-[#D2F34C] transition-colors decoration-2 underline-offset-4">
                  Sign in
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
