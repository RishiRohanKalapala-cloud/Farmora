"use client";

import React from "react";
import Link from "next/link";
import { 
  Check, 
  Home, 
  ArrowRight, 
  Mail, 
  Printer, 
  Download 
} from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen w-full bg-[#FAFAF9] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-md animate-in slide-in-from-bottom-8 fade-in duration-700">
        
        {/* TOP HALF: Success Header */}
        <div className="bg-white rounded-t-[2rem] border-x border-t border-stone-200 p-8 pb-12 text-center shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] relative">
          
          {/* Animated Icon (CSS only) */}
          <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
            {/* Pulsing Rings */}
            <div className="absolute inset-0 rounded-full bg-[#D2F34C] opacity-20 animate-ping"></div>
            <div className="absolute inset-2 rounded-full bg-[#D2F34C] opacity-40 animate-pulse"></div>
            
            {/* Main Icon Circle */}
            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#D2F34C] shadow-lg shadow-[#D2F34C]/30">
              <Check className="h-10 w-10 text-stone-900 stroke-[3px]" />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-stone-500 leading-relaxed px-4">
            Thank you for supporting local farmers. Your fresh goods are getting ready!
          </p>

          <div className="mt-6 flex items-center justify-center gap-2">
             <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600 border border-stone-200">
               <Mail className="h-3 w-3" /> Receipt sent to email
             </span>
          </div>
        </div>

        {/* Receipt Visual Divider (Jagged Edge Effect) */}
        <div className="relative h-4 bg-white overflow-hidden z-20">
             {/* Torn paper look */}
             <div className="absolute -top-2 left-0 right-0 h-4 bg-transparent" style={{ 
               background: "radial-gradient(circle, transparent 6px, #FAFAF9 7px)", 
               backgroundSize: "20px 20px",
               backgroundPosition: "0px 10px"
             }}></div>
        </div>

        {/* BOTTOM HALF: Order Details */}
        <div className="bg-[#FAFAF9] rounded-b-[2rem] border-x border-b border-stone-200 p-8 pt-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]">
           
           <div className="flex justify-between items-center mb-6 pb-6 border-b border-dashed border-stone-300">
              <div className="text-left">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Order ID</p>
                <p className="text-lg font-mono font-bold text-stone-900">#ORD-{Math.floor(Math.random() * 9000) + 1000}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Est. Delivery</p>
                <p className="text-stone-900 font-medium">Tomorrow, 10 AM</p>
              </div>
           </div>

           {/* Actions */}
           <div className="space-y-3">
             <Link href="/marketplace" className="group w-full flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3.5 text-sm font-bold text-white shadow-xl hover:bg-stone-800 hover:-translate-y-0.5 transition-all">
               Continue Shopping <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
             </Link>
             
             <Link href="/" className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm font-bold text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all">
               <Home className="h-4 w-4" /> Return Home
             </Link>
           </div>

           {/* Footer Tools */}
           <div className="mt-8 flex justify-center gap-6 text-xs font-semibold text-stone-400">
              <button className="flex items-center gap-1 hover:text-stone-600 transition-colors">
                <Printer className="h-3 w-3" /> Print Receipt
              </button>
              <div className="w-px h-3 bg-stone-300"></div>
              <button className="flex items-center gap-1 hover:text-stone-600 transition-colors">
                <Download className="h-3 w-3" /> Download Invoice
              </button>
           </div>
        </div>
        
      </div>
    </div>
  );
}