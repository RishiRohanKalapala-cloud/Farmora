"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ================= DATA: CROPS =================
const crops = [
  {
    id: "1",
    name: "Sharbati Wheat",
    farmer: "Rajesh Kumar",
    location: "MP, India",
    price: "450",
    unit: "/quintal",
    rating: "4.9",
    tag: "Organic",
    img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2889&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Royal Gala Apples",
    farmer: "Himachal Orchards",
    location: "Shimla, HP",
    price: "120",
    unit: "/kg",
    rating: "4.8",
    tag: "Fresh",
    img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=2874&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Premium Basmati",
    farmer: "Green Fields Co.",
    location: "Punjab, India",
    price: "90",
    unit: "/kg",
    rating: "5.0",
    tag: "Export Quality",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Sweet Corn",
    farmer: "Lakshmi Farms",
    location: "Maharashtra",
    price: "25",
    unit: "/pc",
    rating: "4.7",
    tag: "Seasonal",
    img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=2070&auto=format&fit=crop",
  },
];

// ================= DATA: TESTIMONIALS =================
const testimonials = [
  {
    name: "Rajesh Singh",
    role: "Wheat Farmer, Punjab",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    quote: "Since joining Farmora, I've eliminated middlemen. The direct connection to buyers has transformed my family's income.",
    stat: "40% Profit Increase",
  },
  {
    name: "Priya Patel",
    role: "Organic Wholesaler, Mumbai",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
    quote: "Finding verified organic produce was a nightmare. Farmora’s transparency and quality checks make procurement effortless.",
    stat: "100% Quality Verified",
  },
  {
    name: "Amit Verma",
    role: "Agri-Entrepreneur, MP",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1887&auto=format&fit=crop",
    quote: "The tech is simple but powerful. I track market rates and list my harvest in seconds. It’s like having a business manager in my pocket.",
    stat: "Zero Food Waste",
  },
  {
    name: "Sarah Jenkins",
    role: "Sustainable Chef, Bangalore",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    quote: "I need the freshest ingredients for my restaurant. Farmora lets me source directly from local farms within 24 hours of harvest.",
    stat: "24hr Farm-to-Table",
  },
  {
    name: "Vikram Malhotra",
    role: "Co-op Leader, Haryana",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    quote: "Managing 500+ farmers was chaos. Now, we digitize our entire inventory and sales process on one dashboard.",
    stat: "500+ Farmers Unified",
  },
  {
    name: "Anjali Devi",
    role: "Rice Farmer, Andhra Pradesh",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
    quote: "The fair pricing I get here allows me to invest in better seeds and equipment. This platform truly cares about us.",
    stat: "Fair Price Guarantee",
  },
];

// ================= SUB-COMPONENT: MARKETPLACE =================
function MarketplaceSection() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedFavs = JSON.parse(
      localStorage.getItem("farmora_favorites") || "[]"
    );
    const storedCart = JSON.parse(localStorage.getItem("farmora_cart") || "[]");
    setFavorites(storedFavs);
    setCart(storedCart);
  }, []);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    let newFavs;
    if (favorites.includes(id)) {
      newFavs = favorites.filter((favId) => favId !== id);
    } else {
      newFavs = [...favorites, id];
    }
    setFavorites(newFavs);
    localStorage.setItem("farmora_favorites", JSON.stringify(newFavs));
  };

  const toggleCart = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    let newCart;
    if (cart.includes(id)) {
      newCart = cart.filter((itemId) => itemId !== id);
    } else {
      newCart = [...cart, id];
    }
    setCart(newCart);
    localStorage.setItem("farmora_cart", JSON.stringify(newCart));
  };

  if (!isClient) return null;

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-[#D2F34C]"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                Live Market
              </span>
            </div>
            <h2 className="text-4xl font-medium text-stone-900 md:text-5xl tracking-tight">
              Fresh from the{" "}
              <span className="italic font-serif text-stone-500">Harvest</span>
            </h2>
          </div>

          <a
            href="/marketplace"
            className="group flex items-center gap-2 rounded-full border border-stone-200 px-6 py-3 text-sm font-bold text-stone-900 transition-all hover:bg-stone-900 hover:text-white"
          >
            View All Crops
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {crops.map((crop) => {
            const isLiked = favorites.includes(crop.id);
            const isInCart = cart.includes(crop.id);

            return (
              <div
                key={crop.id}
                className="group relative flex flex-col rounded-[2.5rem] border border-stone-100 bg-white p-3 shadow-sm transition-all duration-500 hover:border-stone-200 hover:shadow-2xl hover:shadow-stone-900/5 cursor-pointer"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-stone-100">
                  <Image
                    src={crop.img}
                    alt={crop.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />

                  {/* Top Overlay: Tag & Like Button */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                    <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-stone-900 shadow-sm">
                      {crop.tag}
                    </span>

                    {/* Interactive Like Button */}
                    <button
                      onClick={(e) => toggleFavorite(e, crop.id)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-all duration-300 ${
                        isLiked
                          ? "bg-red-50 text-red-500 scale-110"
                          : "bg-white/90 text-stone-400 hover:text-red-500 hover:bg-white"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill={isLiked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-300 ${
                          isLiked ? "scale-100" : ""
                        }`}
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </button>
                  </div>

                  {/* Bottom Overlay: Add to Cart Button */}
                  <div
                    className={`absolute bottom-4 right-4 z-10 transition-all duration-500 ${
                      isInCart
                        ? "translate-y-0 opacity-100"
                        : "translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                    }`}
                  >
                    <button
                      onClick={(e) => toggleCart(e, crop.id)}
                      className={`flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                        isInCart
                          ? "bg-black text-white"
                          : "bg-[#D2F34C] text-stone-900 hover:bg-white"
                      }`}
                    >
                      {isInCart ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div className="flex flex-1 flex-col px-3 pt-5 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 leading-tight group-hover:text-[#8ba324] transition-colors">
                        {crop.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-stone-400"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="text-xs font-medium text-stone-500">
                          {crop.location}
                        </span>
                      </div>
                    </div>
                    {/* Rating */}
                    <div className="flex items-center gap-1 rounded-md bg-stone-50 px-2 py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-yellow-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="text-xs font-bold text-stone-900">
                        {crop.rating}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-stone-100">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-stone-200 overflow-hidden relative">
                        {/* Fallback Avatar Icon */}
                        <svg
                          className="h-full w-full text-stone-400 p-0.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-stone-500">
                        {crop.farmer}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-stone-900">
                        ₹{crop.price}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">
                        {crop.unit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= SUB-COMPONENT: TESTIMONIALS CAROUSEL =================
function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400; // Adjust scroll distance
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-stone-900 py-16 px-6 md:px-12">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-full max-w-7xl opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#D2F34C] blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#D2F34C] blur-[100px] opacity-10"></div>
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D2F34C]">Community Stories</span>
            </div>
            <h2 className="text-4xl font-medium text-white md:text-5xl leading-tight">
              Trusted by those who <br /> <span className="text-[#D2F34C]">feed the nation.</span>
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={() => scroll("left")}
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-[#D2F34C] hover:border-[#D2F34C] hover:text-stone-900 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={() => scroll("right")}
              className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#D2F34C] text-stone-900 transition-all hover:bg-white hover:scale-105 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* Scrollable Container (Carousel) */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((item, i) => (
            <div 
              key={i} 
              className="min-w-[320px] md:min-w-[400px] snap-start group relative flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-[#D2F34C]/30"
            >
              
              {/* Quote Icon */}
              <div className="mb-6">
                <svg className="h-10 w-10 text-[#D2F34C] opacity-50 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>

              {/* Content */}
              <p className="text-lg leading-relaxed text-stone-300 mb-8 font-light italic">
                "{item.quote}"
              </p>

              {/* Success Metric Pill */}
              <div className="mb-8 inline-flex self-start rounded-lg bg-[#D2F34C]/10 px-3 py-1.5 border border-[#D2F34C]/20">
                 <span className="text-xs font-bold text-[#D2F34C] flex items-center gap-1">
                   <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                   {item.stat}
                 </span>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                <div className="h-12 w-12 shrink-0 rounded-full border border-white/20 p-0.5 relative overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill
                    className="rounded-full object-cover" 
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-base">{item.name}</h4>
                    {/* Verified Badge */}
                    <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"/></svg>
                  </div>
                  <p className="text-sm text-stone-400">{item.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= MAIN PAGE COMPONENT =================
export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-[#D2F34C] selection:text-black">
      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[100vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop"
            alt="Farmer in field at sunrise"
            fill
            priority
            className="object-cover"
            quality={90}
          />
          {/* Refined Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-stone-900"></div>
        </div>

        {/* RE-DESIGNED NAVBAR */}
        <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-12">
          {/* Logo (Text Only) */}
          <div className="text-2xl font-bold tracking-tight text-white">
            Farmora<span className="text-[#D2F34C]">.</span>
          </div>

          {/* Floating Menu "Dock" */}
          <div className="hidden items-center rounded-full border border-white/10 bg-black/20 px-2 py-2 backdrop-blur-xl md:flex">
            <a href="/" className="rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 bg-white text-stone-900 shadow-lg">Home</a>
            <a href="/marketplace" className="rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 text-white/80 hover:bg-white/10 hover:text-white">Marketplace</a>
            <a href="/solutions" className="rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 text-white/80 hover:bg-white/10 hover:text-white">Solutions</a>
            <a href="/community" className="rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 text-white/80 hover:bg-white/10 hover:text-white">Community</a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/sign-in"
              className="hidden text-sm font-medium text-white/90 hover:text-white md:block"
            >
              Sign In
            </a>
            <a
              href="#"
              className="rounded-full bg-[#D2F34C] px-6 py-3 text-sm font-bold text-stone-900 hover:bg-[#bce038] transition-transform hover:scale-105"
            >
              Get App
            </a>
            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-white bg-white/10 p-2 rounded-full backdrop-blur-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col justify-end pb-32 px-6 md:px-12 md:flex-row md:items-end md:justify-between">
          {/* Left Side: Title & CTA */}
          <div className="max-w-3xl mb-12 md:mb-0">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#D2F34C]/30 bg-[#D2F34C]/10 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D2F34C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D2F34C]"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D2F34C]">
                The Future of AgTech
              </span>
            </div>
            <h1 className="mb-8 text-5xl font-medium leading-[1.1] text-white md:text-7xl lg:text-8xl">
              Cultivating <br />
              <span className="text-[#D2F34C]">Smarter</span> Futures.
            </h1>
            <p className="mb-10 max-w-lg text-lg text-stone-200/90 leading-relaxed">
              Seamlessly connect with buyers, track crop health via satellite, and
              manage your inventory—all in one unified platform.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="group flex items-center justify-center gap-2 rounded-full bg-[#D2F34C] px-8 py-4 text-base font-bold text-stone-900 transition-all hover:bg-[#c2e830]">
                Start Selling
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
              <button className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">
                View Demo
              </button>
            </div>
          </div>

          {/* Right Side: REDESIGNED Glass Mission Card */}
          <div className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:bg-white/10 md:mb-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#D2F34C]/20 blur-3xl transition-all group-hover:bg-[#D2F34C]/30"></div>

            <div className="relative">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#D2F34C] text-stone-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Trust & Quality
              </h3>
              <p className="text-sm leading-relaxed text-stone-300">
                We verify every farmer and buyer on our platform to ensure
                secure payments and premium quality produce distribution.
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border border-white/20 bg-stone-800"
                    ></div>
                  ))}
                </div>
                <span className="text-xs font-medium text-[#D2F34C]">
                  Joined by 2k+ Farmers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BENTO GRID SECTION ================= */}
      <section className="bg-white mx-auto max-w-7xl px-6 py-24 md:px-12">
        {/* Section Header */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#D2F34C]"></span>
              <span className="text-sm font-bold uppercase tracking-widest text-stone-500">
                Who We Are
              </span>
            </div>
            <h2 className="text-4xl font-medium leading-[1.1] text-stone-900 md:text-5xl lg:text-6xl mb-8">
              Bridging the gap between <br className="hidden md:block" />
              ancient wisdom & modern tech.
            </h2>
            <p className="text-lg text-stone-500 leading-relaxed max-w-2xl">
              At Farmora, we believe the future of agriculture lies in the
              balance of tradition and innovation. By equipping local farmers
              with enterprise-grade data and direct market access, we aren't
              just improving yields—we're revitalizing rural economies and
              ensuring food security for the next generation.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-4 shrink-0">
            <button className="group flex h-14 w-14 items-center justify-center rounded-full border border-stone-200 bg-white transition-all hover:border-stone-900 hover:bg-stone-900 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button className="group flex h-14 w-14 items-center justify-center rounded-full bg-stone-900 text-white transition-all hover:bg-[#D2F34C] hover:text-stone-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* The Expanded Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 auto-rows-[340px]">
          {/* 1. Large Portrait Card: Farmer Stories (Spans 2 Rows) */}
          <div className="group relative lg:row-span-2 overflow-hidden rounded-[2.5rem] bg-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwZmFybWVyfGVufDB8fDB8fHww"
              alt="Asian farmer using technology"
              fill
              className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                Farmer Stories
              </span>
              <p className="text-xl font-medium text-white leading-snug">
                "Farmora gave me the tools to price my harvest fairly, changing
                my family's future."
              </p>
              <p className="mt-2 text-stone-300">— Ravi, Wheat Farmer</p>
            </div>
          </div>

          {/* 2. Stats Card: Yield Increase */}
          <div className="relative flex flex-col justify-between rounded-[2.5rem] bg-stone-100 p-10 transition-colors duration-300 hover:bg-stone-200/80">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-stone-900 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <h3 className="text-6xl font-medium tracking-tighter text-stone-900">
                30%
              </h3>
              <p className="mt-2 text-lg font-semibold text-stone-900">
                Yield Increase
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">
                Average production growth for farmers using our precision tools.
              </p>
            </div>
          </div>

          {/* 3. Wide Card: Precision Tech (New - Spans 2 Columns) */}
          <div className="group relative col-span-1 lg:col-span-2 overflow-hidden rounded-[2.5rem] bg-stone-900">
            <Image
              src="https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=2070&auto=format&fit=crop"
              alt="Drone aerial view"
              fill
              className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
            <div className="absolute top-10 left-10 max-w-md z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D2F34C] text-stone-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M12 2v20" />
                </svg>
              </div>
              <h3 className="text-3xl font-medium text-white mb-4">
                Precision Intelligence
              </h3>
              <p className="text-stone-300 leading-relaxed">
                Our AI-driven drones map 500+ acres in minutes, identifying
                water stress and pest risks before they become problems.
              </p>
            </div>
          </div>

          {/* 4. Stats Card: Active Farmers (Lime) */}
          <div className="group relative flex flex-col justify-between rounded-[2.5rem] bg-[#D2F34C] p-10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#D2F34C]/20">
            <div className="flex justify-between items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" x2="23" y1="8" y2="11" />
                  <line x1="23" x2="20" y1="8" y2="11" />
                </svg>
              </div>
              <div className="h-8 w-8 rounded-full border border-black/10 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>

            <div>
              <h3 className="text-6xl font-medium tracking-tighter text-stone-900">
                12k+
              </h3>
              <p className="mt-2 text-lg font-semibold text-stone-900">
                Active Farmers
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone-800">
                Trusting our platform daily to eliminate middlemen.
              </p>
            </div>
          </div>

          {/* 5. Image Card: Sustainable Future (New) */}
          <div className="group relative overflow-hidden rounded-[2.5rem] bg-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=2070&auto=format&fit=crop"
              alt="Hands holding soil"
              fill
              className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="absolute bottom-6 left-6">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl">
                <p className="text-sm font-bold text-stone-900">
                  Zero Carbon Goal
                </p>
              </div>
            </div>
          </div>

          {/* 6. Stats Card: Water Saved (New) */}
          <div className="relative flex flex-col justify-between rounded-[2.5rem] bg-stone-900 p-10 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#D2F34C]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2.69l5.74 5.74a8 8 0 1 1-11.48 0l5.74-5.74z" />
                <path d="M9.9 14.1a3.8 3.8 0 0 0 2.1-.73" />
              </svg>
            </div>
            <div>
              <h3 className="text-5xl font-medium tracking-tighter text-white">
                40%
              </h3>
              <p className="mt-2 text-lg font-semibold text-[#D2F34C]">
                Water Saved
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone-400">
                Through smart irrigation scheduling and moisture sensors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS (Fixed Rupee Symbol) ================= */}
      <section className="relative overflow-hidden bg-[#D2F34C] py-20 px-6 md:px-12">
        {/* Background Texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(#000 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <div className="relative mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-white/60 px-5 py-2 backdrop-blur-md mb-5 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-900 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-stone-900"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-stone-900">
                Seamless Process
              </span>
            </div>
            <h2 className="mx-auto max-w-3xl text-4xl font-medium leading-tight text-stone-900 md:text-5xl">
              From your farm to their table <br /> in{" "}
              <span className="relative inline-block px-2">
                3 simple steps
                <svg
                  className="absolute bottom-1 left-0 w-full h-3 text-white/40 -z-10"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
          </div>

          {/* Process Flow Container */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-[3rem] left-[16%] right-[16%] hidden h-0.5 border-t-2 border-dashed border-stone-900/20 lg:block"></div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
              {/* --- STEP 01 --- */}
              <div className="group relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-stone-900 shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-stone-900/20">
                  <div className="text-white group-hover:text-[#D2F34C] transition-colors duration-300">
                    {/* Register Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-[#D2F34C] text-sm font-black text-stone-900 shadow-sm">
                    01
                  </div>
                </div>
                <div className="w-full flex-1 rounded-[2rem] bg-white/90 p-6 backdrop-blur-sm border border-white/40 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-xl">
                  <h3 className="mb-2 text-lg font-bold text-stone-900">
                    Register & Verify
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-600">
                    Create your profile. We verify land records to build a
                    trusted community of genuine farmers.
                  </p>
                </div>
              </div>

              {/* --- STEP 02 --- */}
              <div className="group relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-stone-900 shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-stone-900/20">
                  <div className="text-white group-hover:text-[#D2F34C] transition-colors duration-300">
                    {/* Listing Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <path d="M12 11h4" />
                      <path d="M12 16h4" />
                      <path d="M8 11h.01" />
                      <path d="M8 16h.01" />
                    </svg>
                  </div>
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-[#D2F34C] text-sm font-black text-stone-900 shadow-sm">
                    02
                  </div>
                </div>
                <div className="w-full flex-1 rounded-[2rem] bg-white/90 p-6 backdrop-blur-sm border border-white/40 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-xl">
                  <h3 className="mb-2 text-lg font-bold text-stone-900">
                    List Your Harvest
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-600">
                    Upload photos and set your price in{" "}
                    <span className="font-bold text-stone-900">
                      ₹ (Rupees)
                    </span>
                    . Our AI suggests best Mandi rates.
                  </p>
                </div>
              </div>

              {/* --- STEP 03 --- */}
              <div className="group relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-stone-900 shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-stone-900/20">
                  <div className="text-white group-hover:text-[#D2F34C] transition-colors duration-300">
                    {/* FIXED INDIAN RUPEE ICON */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 3h12" />
                      <path d="M6 8h12" />
                      <path d="m6 13 8.5 8" />
                      <path d="M6 13h3" />
                      <path d="M9 13c6.667 0 6.667-10 0-10" />
                    </svg>
                  </div>
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-[#D2F34C] text-sm font-black text-stone-900 shadow-sm">
                    03
                  </div>
                </div>
                <div className="w-full flex-1 rounded-[2rem] bg-white/90 p-6 backdrop-blur-sm border border-white/40 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-xl">
                  <h3 className="mb-2 text-lg font-bold text-stone-900">
                    Get Paid Instantly
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-600">
                    Ship produce to the buyer. Once accepted, payment is
                    released directly to your bank via UPI.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 flex justify-center">
              <button className="group flex items-center gap-3 rounded-full bg-stone-900 px-8 py-4 text-base font-bold text-white transition-all hover:bg-black hover:scale-105 hover:shadow-2xl hover:shadow-stone-900/20">
                Start Selling Now
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D2F34C] text-stone-900 transition-transform group-hover:translate-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MARKETPLACE SECTION ================= */}
      <MarketplaceSection />

      {/* ================= TESTIMONIALS (NEW CAROUSEL) ================= */}
      <TestimonialsSection />

      {/* ================= CTA SECTION ================= */}
      <section className="relative w-full bg-stone-950 overflow-hidden">
  <div className="grid grid-cols-1 lg:grid-cols-2">
    
    {/* LEFT SIDE: Content */}
    <div className="relative flex flex-col justify-center px-6 py-20 sm:px-12 lg:p-24 xl:p-32 z-10">
      {/* Background Pattern for Texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
      
      <div className="relative">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-800 bg-stone-900/50 px-3 py-1 text-[#D2F34C] backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#D2F34C] animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider">Early Access</span>
        </div>

        <h2 className="mb-6 text-5xl font-medium leading-[1.05] text-white md:text-6xl lg:text-7xl tracking-tight">
          Agriculture, <br />
          <span className="text-[#D2F34C]">Modernized.</span>
        </h2>
        
        <p className="mb-10 max-w-md text-lg text-stone-400 font-light leading-relaxed">
          Stop relying on guesswork. Join 12,000+ farmers using satellite data and direct market access to maximize every acre.
        </p>

        {/* Action Area */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
          <input 
            type="email" 
            placeholder="Enter your phone number" 
            className="w-full rounded-full bg-stone-900/80 border border-stone-800 px-6 py-4 text-white placeholder-stone-500 focus:border-[#D2F34C] focus:outline-none focus:ring-1 focus:ring-[#D2F34C] transition-all"
          />
          <button className="whitespace-nowrap rounded-full bg-[#D2F34C] px-8 py-4 text-base font-bold text-stone-950 transition-transform hover:scale-105 hover:bg-[#cbf035]">
            Get App Link
          </button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 flex items-center gap-6 border-t border-stone-800 pt-8">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white">4.9/5</span>
            <span className="text-xs text-stone-500 uppercase tracking-wider">App Store Rating</span>
          </div>
          <div className="h-10 w-px bg-stone-800"></div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white">2M+</span>
            <span className="text-xs text-stone-500 uppercase tracking-wider">Acres Managed</span>
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE: Full Width Image */}
    <div className="relative h-[500px] w-full lg:h-auto lg:min-h-screen">
      <div className="absolute inset-0 bg-stone-950/20 z-10 lg:hidden"></div> {/* Mobile Overlay */}
      <Image
        src="https://images.unsplash.com/photo-1625246333195-58197bd47f26?q=80&w=2071&auto=format&fit=crop"
        alt="Smart Farming Technology"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      
      {/* Decorative Gradient Fade on Desktop to blend image with text area */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-stone-950 to-transparent z-10 hidden lg:block"></div>

      {/* Floating Glass Card (Visual Proof) */}
      <div className="absolute bottom-8 right-8 z-20 max-w-xs w-full rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-bold text-stone-400 uppercase">Current Yield</p>
            <p className="text-2xl font-bold text-white">12.5 Tons</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D2F34C] text-stone-950">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          </div>
        </div>
        <div className="w-full bg-stone-700/50 rounded-full h-1.5 mb-2">
          <div className="bg-[#D2F34C] h-1.5 rounded-full" style={{ width: '75%' }}></div>
        </div>
        <p className="text-xs text-stone-300 text-right">75% of target reached</p>
      </div>
    </div>

  </div>
</section>

     {/* ================= FOOTER (FULL WIDTH) ================= */}
<footer className="relative w-full bg-stone-950 pt-24 pb-10 overflow-hidden text-stone-400 font-sans border-t border-stone-900">
  
  {/* Ambient Background Light */}
  <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[#D2F34C] opacity-[0.03] blur-[120px]"></div>

  {/* Main Content Container - Changed from max-w-7xl to w-full with generous padding */}
  <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
    
    {/* Top Section: Brand & Newsletter */}
    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-12 mb-24">
      
      {/* Brand Column */}
      <div className="max-w-xl">
        <a href="#" className="inline-block text-4xl font-bold tracking-tight text-white mb-6">
          Farmora<span className="text-[#D2F34C]">.</span>
        </a>
        <p className="text-xl font-light leading-relaxed text-stone-400 mb-8 max-w-lg">
          The operating system for modern agriculture. We bridge the gap between ancient wisdom and satellite intelligence to secure the world's food future.
        </p>
        <div className="flex gap-4">
          {/* Social Icons */}
          {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map((social) => (
            <a key={social} href="#" className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-800 bg-stone-900/50 text-white transition-all hover:border-[#D2F34C] hover:bg-[#D2F34C] hover:text-stone-950 hover:-translate-y-1">
              <span className="sr-only">{social}</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="w-full max-w-md rounded-3xl border border-stone-800 bg-stone-900/30 p-8 backdrop-blur-sm xl:mt-2">
        <h3 className="text-xl text-white font-bold mb-3">Join the Harvest</h3>
        <p className="text-base text-stone-500 mb-6">Get weekly market insights, weather alerts, and platform updates directly to your inbox.</p>
        <div className="flex gap-3">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="w-full rounded-xl bg-stone-950 border border-stone-800 px-5 py-3.5 text-base text-white placeholder-stone-600 focus:border-[#D2F34C] focus:outline-none focus:ring-1 focus:ring-[#D2F34C] transition-all"
          />
          <button className="rounded-xl bg-[#D2F34C] px-5 py-3.5 text-stone-950 font-bold hover:bg-white hover:scale-105 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
          </button>
        </div>
      </div>
    </div>

    {/* Links Grid - Expanded Spacing for Full Width */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 border-t border-stone-800/50 pt-16 mb-24">
      
      <div>
        <h4 className="text-lg font-bold text-white mb-8">Marketplace</h4>
        <ul className="space-y-5 text-base font-medium text-stone-500">
          <li><a href="#" className="hover:text-[#D2F34C] hover:pl-2 transition-all">Browse Crops</a></li>
          <li><a href="#" className="hover:text-[#D2F34C] hover:pl-2 transition-all">Today's Mandi Rates</a></li>
          <li><a href="#" className="hover:text-[#D2F34C] hover:pl-2 transition-all">Sell Harvest</a></li>
          <li><a href="#" className="hover:text-[#D2F34C] hover:pl-2 transition-all">Logistics Partner</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-bold text-white mb-8">Solutions</h4>
        <ul className="space-y-5 text-base font-medium text-stone-500">
          <li><a href="#" className="hover:text-[#D2F34C] hover:pl-2 transition-all">Precision Farming</a></li>
          <li><a href="#" className="hover:text-[#D2F34C] hover:pl-2 transition-all">Soil Testing AI</a></li>
          <li><a href="#" className="hover:text-[#D2F34C] hover:pl-2 transition-all">Drone Mapping</a></li>
          <li><a href="#" className="hover:text-[#D2F34C] hover:pl-2 transition-all">Kisan Credit</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-bold text-white mb-8">Company</h4>
        <ul className="space-y-5 text-base font-medium text-stone-500">
          <li><a href="#" className="hover:text-[#D2F34C] hover:pl-2 transition-all">Our Story</a></li>
          <li><a href="#" className="hover:text-[#D2F34C] hover:pl-2 transition-all">Impact Report</a></li>
          <li><a href="#" className="hover:text-[#D2F34C] hover:pl-2 transition-all">Careers</a> <span className="ml-2 inline-flex items-center rounded-full bg-[#D2F34C] px-2 py-0.5 text-[10px] font-bold uppercase text-stone-900">Hiring</span></li>
          <li><a href="#" className="hover:text-[#D2F34C] hover:pl-2 transition-all">Press Kit</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-bold text-white mb-8">Contact</h4>
        <ul className="space-y-6 text-base font-medium text-stone-500">
          <li className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-900 text-stone-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <span>Global Tech Hub, Cyber City<br/>Gurugram, India 122002</span>
          </li>
          <li className="flex items-center gap-4">
             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-900 text-stone-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
             </div>
             <a href="mailto:hello@farmora.com" className="hover:text-white transition-colors">hello@farmora.com</a>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="relative border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-end gap-8 pb-32 md:pb-8">
       <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
         <p className="text-sm text-stone-600">© 2024 Farmora Inc.</p>
         <div className="flex gap-8 text-sm font-medium text-stone-500">
           <a href="#" className="hover:text-white transition-colors">Privacy</a>
           <a href="#" className="hover:text-white transition-colors">Terms</a>
           <a href="#" className="hover:text-white transition-colors">Cookies</a>
           <a href="#" className="hover:text-white transition-colors">Sitemap</a>
         </div>
       </div>
       
       {/* Scroll to top */}
       <button 
         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
         className="group flex items-center gap-3 text-sm font-bold text-white transition-colors hover:text-[#D2F34C]"
       >
         Back to top
         <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 bg-stone-900 transition-all group-hover:border-[#D2F34C] group-hover:bg-[#D2F34C] group-hover:text-stone-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
         </span>
       </button>
    </div>

    {/* Massive Watermark Text - Adjusted for full width scaling */}
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center opacity-[0.04] select-none overflow-hidden">
      <span className="text-[20vw] font-bold leading-none text-white tracking-tighter translate-y-[20%]">
        FARMORA
      </span>
    </div>

  </div>
</footer>
    </div>
  );
}