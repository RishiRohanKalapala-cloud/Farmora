"use client";

import React, { useState } from "react";
import { ArrowLeft, Mail, Lock, Check, Quote } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "farmer">("user");
  return (
    <div className="min-h-screen w-full flex bg-white text-stone-900 font-sans">
      
      {/* LEFT SIDE: Visual/Brand Area 
          Hidden on mobile, distinct on desktop. 
      */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-stone-50 flex-col items-center justify-center overflow-hidden border-r border-stone-100 p-12">
        {/* Abstract Background Shapes (Brand Color #D2F34C) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D2F34C]/20 rounded-full blur-[120px]" />
        
        {/* Content overlaid on background */}
        <div className="relative z-10 max-w-lg w-full space-y-10">
          
          {/* Main Headline & Description */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-stone-900">
              Cultivating the future.
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed max-w-md">
              Join Farmora to streamline your agricultural management with precision. 
              Monitor crops, manage resources, and grow efficiently.
            </p>
          </div>

          {/* Telugu Quote Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D2F34C] to-[#cbf035] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-stone-200 shadow-sm">
              <Quote className="h-8 w-8 text-stone-400 mb-4 opacity-50" />
              <blockquote className="text-2xl font-bold text-stone-900 leading-snug">
                "నేల తల్లిని నమ్ముకున్న వాడు ఎప్పుడూ చెడిపోడు."
              </blockquote>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-1 w-8 bg-[#D2F34C] rounded-full"></div>
                <p className="text-sm font-semibold text-stone-500">
                  రైతు సామెత (Farmer's Proverb)
                </p>
              </div>
            </div>
          </div>

        </div>
        
        {/* Grainy Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-multiply pointer-events-none"></div>
      </div>

      {/* RIGHT SIDE: Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative">
        
        {/* "Back to Home" Button - Black Filled */}
        <a href="/" className="absolute top-8 left-8 flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 hover:shadow-lg transition-all active:scale-95">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>

        <div className="w-full max-w-sm space-y-8 mt-12 lg:mt-0">
          <div className="text-left">
            <h1 className="text-3xl font-bold tracking-tight text-stone-900">Welcome back</h1>
            <p className="mt-2 text-stone-500">
              Please enter your details to sign in.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
            const password = (form.elements.namedItem("password") as HTMLInputElement)?.value || "";
            if (!email || !password) return;
            localStorage.setItem("farmora_user", JSON.stringify({ email, role }));
            router.push("/marketplace");
          }}>
            <div className="space-y-4">
              {/* Role Selection */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-stone-700">Role</label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="radio" name="role" value="user" checked={role === "user"} onChange={() => setRole("user")} /> User
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="radio" name="role" value="farmer" checked={role === "farmer"} onChange={() => setRole("farmer")} /> Farmer
                </label>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-stone-700">Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400 group-focus-within:text-stone-800 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input 
                    name="email"
                    type="email" 
                    className="block w-full rounded-xl border border-stone-200 bg-stone-50 pl-10 pr-4 py-3 text-stone-900 placeholder-stone-400 transition-all duration-200 focus:bg-white focus:border-[#D2F34C] focus:ring-4 focus:ring-[#D2F34C]/20 focus:outline-none sm:text-sm" 
                    placeholder="you@example.com" 
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-stone-700">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400 group-focus-within:text-stone-800 transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input 
                    name="password"
                    type="password" 
                    className="block w-full rounded-xl border border-stone-200 bg-stone-50 pl-10 pr-4 py-3 text-stone-900 placeholder-stone-400 transition-all duration-200 focus:bg-white focus:border-[#D2F34C] focus:ring-4 focus:ring-[#D2F34C]/20 focus:outline-none sm:text-sm" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="checkbox" className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-stone-300 shadow-sm transition-all checked:border-[#D2F34C] checked:bg-[#D2F34C] hover:border-[#D2F34C]" />
                  <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-stone-900 opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-stone-600 group-hover:text-stone-900 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-stone-600 hover:text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-900 transition-all">
                Forgot password?
              </a>
            </div>

            <button 
              type="submit" 
              className="w-full rounded-xl bg-[#D2F34C] px-6 py-3.5 text-sm font-bold text-stone-900 shadow-lg shadow-[#D2F34C]/20 hover:bg-[#cbf035] hover:shadow-[#D2F34C]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-stone-400">New to Farmora?</span>
            </div>
          </div>

          <div className="text-center">
            <a href="/sign-up" className="inline-flex items-center justify-center w-full rounded-xl border border-stone-200 bg-white px-6 py-3.5 text-sm font-bold text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}