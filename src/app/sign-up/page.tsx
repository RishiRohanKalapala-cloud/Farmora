"use client";

import React, { useState } from "react";
import { ArrowLeft, User, Mail, Lock, ArrowRight, Leaf, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "farmer">("user");
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-stone-50 overflow-hidden font-sans selection:bg-[#D2F34C] selection:text-stone-900">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      {/* Large organic gradients to create a 'fresh' atmosphere distinct from the split screen */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#D2F34C]/15 rounded-full blur-[100px] animate-pulse duration-10000" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-stone-200/40 rounded-full blur-[80px]" />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- BACK BUTTON --- */}
      <a href="/" className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 hover:shadow-lg hover:-translate-y-0.5 transition-all">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </a>

      {/* --- MAIN CARD --- */}
      <div className="relative z-10 w-full max-w-[480px] px-6">
        
        {/* Floating Badge (Decorative) */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 backdrop-blur-md px-4 py-1.5 shadow-sm">
            <Leaf className="h-4 w-4 text-[#7aa808]" fill="#D2F34C" />
            <span className="text-xs font-bold uppercase tracking-widest text-stone-600">Start Growing Today</span>
          </div>
        </div>

        {/* Glass Card Container */}
        <div className="group relative rounded-3xl border border-white/50 bg-white/60 backdrop-blur-xl p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] hover:bg-white/80">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-stone-900">
              Create Account
            </h1>
            <p className="mt-2 text-stone-500">
              Join Farmora and modernize your harvest.
            </p>
          </div>

          {/* Form */}
            <form className="space-y-5" onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
              const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
              const password = (form.elements.namedItem("password") as HTMLInputElement)?.value || "";
              const terms = (form.elements.namedItem("terms") as HTMLInputElement)?.checked || false;
              if (!name || !email || !password || !terms) return;
              localStorage.setItem("farmora_user", JSON.stringify({ name, email, role }));
              router.push("/marketplace");
            }}>
              {/* Role Selection */}
              <div className="flex items-center gap-3 px-1">
                <label className="text-sm font-semibold text-stone-700">Role</label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="radio" name="role" value="user" checked={role === "user"} onChange={() => setRole("user")} /> User
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="radio" name="role" value="farmer" checked={role === "farmer"} onChange={() => setRole("farmer")} /> Farmer
                </label>
              </div>
            
            {/* Name */}
            <div className="group/input relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 transition-colors group-focus-within/input:text-stone-800">
                <User className="h-5 w-5" />
              </div>
              <input 
                name="name"
                type="text" 
                className="w-full rounded-2xl border border-stone-200/80 bg-white/50 px-12 py-3.5 text-stone-900 placeholder:text-stone-400 focus:border-[#D2F34C] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#D2F34C]/20 transition-all"
                placeholder="Full Name"
              />
            </div>

            {/* Email */}
            <div className="group/input relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 transition-colors group-focus-within/input:text-stone-800">
                <Mail className="h-5 w-5" />
              </div>
              <input 
                name="email"
                type="email" 
                className="w-full rounded-2xl border border-stone-200/80 bg-white/50 px-12 py-3.5 text-stone-900 placeholder:text-stone-400 focus:border-[#D2F34C] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#D2F34C]/20 transition-all"
                placeholder="Email Address"
              />
            </div>

            {/* Password */}
            <div className="group/input relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 transition-colors group-focus-within/input:text-stone-800">
                <Lock className="h-5 w-5" />
              </div>
              <input 
                name="password"
                type="password" 
                className="w-full rounded-2xl border border-stone-200/80 bg-white/50 px-12 py-3.5 text-stone-900 placeholder:text-stone-400 focus:border-[#D2F34C] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#D2F34C]/20 transition-all"
                placeholder="Password"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 px-1">
              <input id="terms" name="terms" type="checkbox" className="mt-1 h-4 w-4 cursor-pointer rounded border-stone-300 accent-[#D2F34C] focus:ring-[#D2F34C]" />
              <label htmlFor="terms" className="text-xs text-stone-500 leading-tight cursor-pointer select-none">
                I agree to the <span className="font-semibold text-stone-700 hover:underline">Terms of Service</span> and <span className="font-semibold text-stone-700 hover:underline">Privacy Policy</span>.
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="group/btn relative w-full overflow-hidden rounded-2xl bg-[#D2F34C] px-6 py-4 text-sm font-bold text-stone-900 shadow-xl shadow-[#D2F34C]/20 transition-all hover:scale-[1.02] hover:shadow-[#D2F34C]/40 active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Create Account <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
            </button>

          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-stone-500">
              Already have an account?{' '}
              <a href="/sign-in" className="font-bold text-stone-900 hover:text-[#7aa808] transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Trust/Social Proof Snippet below the card */}
        <div className="mt-8 flex justify-center opacity-80">
           <div className="flex items-center gap-3 rounded-full bg-white/40 px-4 py-2 backdrop-blur-sm border border-white/20">
             <div className="flex -space-x-2">
               {[1,2,3].map((i) => (
                 <div key={i} className={`h-6 w-6 rounded-full border border-white bg-stone-200 flex items-center justify-center text-[10px] font-bold text-stone-500`}>
                    {/* Placeholder for user avatars */}
                 </div>
               ))}
             </div>
             <div className="flex items-center gap-1">
               <span className="text-xs font-bold text-stone-800">5k+ Farmers</span>
               <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}