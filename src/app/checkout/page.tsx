"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  CheckCircle2, 
  ShoppingBag, 
  Trash2, 
  ArrowLeft, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  CreditCard,
  Plus,
  Minus,
  Star,
  Sparkles,
  Leaf,
  Truck,
  ShieldCheck
} from "lucide-react";
import { useCart } from "@/hooks/useCart";

// --- Types ---
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  rating: number;
};

// --- Verified Image Data ---
const SUGGESTED_PRODUCTS: Product[] = [
  { id: "s1", name: "Fresh Mint Leaves", category: "Herbs", price: 10, unit: "bunch", rating: 4.8, image: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_600,h_600/https://ootymart.com/wp-content/uploads/2025/03/IMG-20250317-WA0040-600x600.jpg" },
  { id: "s2", name: "Yellow Lemons", category: "Fruits", price: 5, unit: "pc", rating: 4.5, image: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&q=80&w=400" },
  { id: "s3", name: "Curry Leaves", category: "Herbs", price: 15, unit: "pack", rating: 4.9, image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=400" },
  { id: "s4", name: "Green Peas", category: "Vegetables", price: 40, unit: "kg", rating: 4.6, image: "https://images.unsplash.com/photo-1592394533824-9440e5d68530?auto=format&fit=crop&q=80&w=400" },
  { id: "s5", name: "Sweet Corn", category: "Vegetables", price: 25, unit: "pc", rating: 4.7, image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=400" },
  { id: "s6", name: "Fresh Beetroot", category: "Vegetables", price: 35, unit: "kg", rating: 4.4, image: "https://smartyield.in/wp-content/uploads/2021/06/Beetroot.png" },
  { id: "s7", name: "Green Cabbage", category: "Vegetables", price: 30, unit: "pc", rating: 4.3, image: "https://rukminim2.flixcart.com/image/480/640/ks6ef0w0/plant-seed/p/q/m/25-cabbage-cbg359-cbg-25-lyrs-original-imag5t3hg4u5qgkz.jpeg?q=90" },
  { id: "s8", name: "Ripe Papaya", category: "Fruits", price: 45, unit: "pc", rating: 4.6, image: "https://cdnasd.countrydelight.in/cdproductimg/new-website/PAPAYARIPE-pdp.jpg_1723792868072.jpg" },
  { id: "s9", name: "White Radish", category: "Vegetables", price: 20, unit: "bunch", rating: 4.2, image: "https://www.bbassets.com/media/uploads/p/l/10000166_19-fresho-radish-white.jpg" },
  { id: "s10", name: "Red Pomegranate", category: "Fruits", price: 120, unit: "kg", rating: 4.8, image: "https://5.imimg.com/data5/WS/OS/MY-10101453/natural-red-pomegranate-500x500.jpg" },
];

function getUser() {
  try {
    const raw = localStorage.getItem("farmora_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// --- Components ---

const Toast = ({ show, message }: { show: boolean; message: string }) => {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="flex items-center gap-3 bg-stone-900 text-white px-5 py-3 rounded-full shadow-2xl border border-stone-800">
        <div className="bg-[#D2F34C] rounded-full p-1">
          <CheckCircle2 className="h-4 w-4 text-stone-900" />
        </div>
        <span className="text-sm font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, updateQty, removeItem, clearCart, total, addItem } = useCart();
  const user = useMemo(() => getUser(), []);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [toast, setToast] = useState({ show: false, msg: "" });

  const isUser = user?.role === "user";

  useEffect(() => {
    // Auth Check logic
  }, [isUser, router]);

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) {
      showToast("Please fill in all required fields.");
      return;
    }
    
    const order = {
      id: `${Date.now()}`,
      buyer: { name, email, address, phone },
      items,
      total,
      createdAt: new Date().toISOString(),
      status: "processing",
    };
    
    const raw = localStorage.getItem("farmora_orders");
    const orders = raw ? JSON.parse(raw) : [];
    orders.unshift(order);
    localStorage.setItem("farmora_orders", JSON.stringify(orders));
    
    clearCart();
    router.push("/checkout/success");
  };

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3000);
  };

  const handleAddSuggested = (p: Product) => {
    addItem({
      id: p.id,
      name: p.name,
      price: p.price,
      qty: 1,
      unit: p.unit,
      img: p.image,
      farmer: "Farmora Select"
    });
    showToast(`Added ${p.name} to cart!`);
  };

  const filteredSuggestions = useMemo(() => {
    const cartIds = new Set(items.map(i => i.id));
    return SUGGESTED_PRODUCTS.filter(p => !cartIds.has(p.id));
  }, [items]);

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-[#D2F34C] selection:text-stone-900 pb-20">
      <Toast show={toast.show} message={toast.msg} />

      {/* --- Simple Checkout Header --- */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link 
            href="/marketplace" 
            className="group flex items-center gap-2 rounded-full bg-stone-100 px-4 py-2 text-sm font-bold text-stone-700 transition-all hover:bg-stone-200"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </Link>
          
          <div className="flex items-center gap-2">
             <div className="h-8 w-8 rounded-full bg-[#D2F34C] flex items-center justify-center shadow-md">
                <Leaf className="h-4 w-4 text-stone-900" />
             </div>
             <span className="font-bold text-stone-900 text-lg">Secure Checkout</span>
          </div>
          
          <div className="w-20"></div> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* --- LEFT SIDE: INPUT FORMS (User Friendly Flow) --- */}
          <div className="lg:col-span-7 space-y-8">
            <form id="checkout-form" onSubmit={placeOrder} className="space-y-8">
              
              {/* Section 1: Contact */}
              <div className="rounded-[2rem] bg-white p-6 md:p-8 shadow-sm border border-stone-100">
                <div className="flex items-center gap-3 mb-6">
                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                     <User className="h-5 w-5" />
                   </div>
                   <h2 className="text-xl font-bold text-stone-900">Contact Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="col-span-2 md:col-span-1 space-y-1.5">
                    <label className="text-xs font-bold uppercase text-stone-500 ml-1">Full Name</label>
                    <input 
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-900 placeholder:text-stone-400 focus:border-[#D2F34C] focus:outline-none focus:ring-4 focus:ring-[#D2F34C]/20 transition-all font-medium" 
                      placeholder="e.g. Rajesh Kumar" 
                      value={name} 
                      onChange={(e)=>setName(e.target.value)} 
                      required
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 space-y-1.5">
                    <label className="text-xs font-bold uppercase text-stone-500 ml-1">Phone Number</label>
                    <input 
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-900 placeholder:text-stone-400 focus:border-[#D2F34C] focus:outline-none focus:ring-4 focus:ring-[#D2F34C]/20 transition-all font-medium" 
                      placeholder="98765..." 
                      value={phone} 
                      onChange={(e)=>setPhone(e.target.value)} 
                    />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-xs font-bold uppercase text-stone-500 ml-1">Email Address</label>
                    <input 
                      type="email"
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-900 placeholder:text-stone-400 focus:border-[#D2F34C] focus:outline-none focus:ring-4 focus:ring-[#D2F34C]/20 transition-all font-medium" 
                      placeholder="you@example.com" 
                      value={email} 
                      onChange={(e)=>setEmail(e.target.value)} 
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Shipping */}
              <div className="rounded-[2rem] bg-white p-6 md:p-8 shadow-sm border border-stone-100">
                <div className="flex items-center gap-3 mb-6">
                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                     <Truck className="h-5 w-5" />
                   </div>
                   <h2 className="text-xl font-bold text-stone-900">Delivery Details</h2>
                </div>

                <div className="space-y-1.5">
                   <label className="text-xs font-bold uppercase text-stone-500 ml-1">Shipping Address</label>
                   <textarea 
                     className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-900 placeholder:text-stone-400 focus:border-[#D2F34C] focus:outline-none focus:ring-4 focus:ring-[#D2F34C]/20 transition-all font-medium min-h-[120px] resize-none leading-relaxed" 
                     placeholder="House Number, Street Name, Landmark, City, Pincode" 
                     value={address} 
                     onChange={(e)=>setAddress(e.target.value)} 
                     required
                   />
                </div>
              </div>

              {/* Mobile Only: Place Order Button (Shows here on small screens, hidden on large) */}
              <div className="lg:hidden">
                <button 
                  type="submit" 
                  disabled={items.length === 0}
                  className="w-full rounded-xl bg-[#D2F34C] px-6 py-4 text-base font-bold text-stone-900 shadow-lg hover:bg-[#cbf035] transition-all disabled:opacity-50"
                >
                  Pay ₹{total.toFixed(2)}
                </button>
              </div>

            </form>
          </div>

          {/* --- RIGHT SIDE: ORDER SUMMARY (Sticky) --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              
              <div className="rounded-[2rem] bg-white border border-stone-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                <div className="bg-stone-50/80 p-6 border-b border-stone-100">
                  <h3 className="font-bold text-stone-900 text-lg flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-stone-500" />
                    Order Summary
                  </h3>
                </div>

                <div className="p-6">
                  {items.length === 0 ? (
                    <div className="text-center py-8">
                       <p className="text-stone-500">Your cart is empty.</p>
                       <Link href="/marketplace" className="text-[#7aa808] font-bold text-sm hover:underline mt-2 inline-block">Start Shopping</Link>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                      {items.map((i) => (
                        <div key={i.id} className="flex gap-4 items-start">
                          <div className="h-16 w-16 shrink-0 rounded-xl bg-stone-100 overflow-hidden border border-stone-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={i.img || "/images/placeholder.png"} alt={i.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1">
                             <div className="flex justify-between items-start">
                                <h4 className="font-bold text-stone-900 text-sm leading-tight">{i.name}</h4>
                                <span className="font-bold text-stone-900 text-sm">₹{(i.price * i.qty).toFixed(2)}</span>
                             </div>
                             <p className="text-xs text-stone-500 mt-1">{i.unit} • x{i.qty}</p>
                             
                             <div className="flex items-center gap-3 mt-2">
                               <button onClick={() => updateQty(i.id, Math.max(1, i.qty - 1))} className="text-stone-400 hover:text-stone-900 transition-colors"><Minus className="h-3 w-3" /></button>
                               <span className="text-xs font-bold text-stone-700">{i.qty}</span>
                               <button onClick={() => updateQty(i.id, i.qty + 1)} className="text-stone-400 hover:text-stone-900 transition-colors"><Plus className="h-3 w-3" /></button>
                               <div className="h-3 w-[1px] bg-stone-300 mx-1"></div>
                               <button onClick={() => removeItem(i.id)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 className="h-3 w-3" /></button>
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="mt-6 pt-6 border-t border-dashed border-stone-200 space-y-3">
                    <div className="flex justify-between text-sm text-stone-500">
                      <span>Subtotal</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-stone-500">
                      <span>Shipping</span>
                      <span className="text-[#7aa808] font-bold">Free</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                       <span className="font-bold text-stone-900">Total</span>
                       <span className="text-2xl font-extrabold text-stone-900">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Desktop Submit Button */}
                  <button 
                    onClick={(e) => {
                      const form = document.getElementById('checkout-form') as HTMLFormElement;
                      if(form) form.requestSubmit();
                    }}
                    disabled={items.length === 0}
                    className="hidden lg:flex w-full mt-6 rounded-xl bg-[#D2F34C] px-6 py-4 text-base font-bold text-stone-900 shadow-xl shadow-[#D2F34C]/20 hover:bg-[#cbf035] hover:shadow-[#D2F34C]/40 hover:-translate-y-1 active:translate-y-0 transition-all items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle2 className="h-5 w-5" /> Place Order
                  </button>
                  
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-stone-400">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Secure SSL Encrypted Payment</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* --- SUGGESTED ITEMS --- */}
        <section className="mt-24 pt-10 border-t border-stone-200">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="h-5 w-5 text-[#7aa808]" fill="#D2F34C" />
            <h2 className="text-2xl font-bold text-stone-900">Don't forget these</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredSuggestions.slice(0, 10).map((p) => (
              <div key={p.id} className="group relative flex flex-col rounded-2xl border border-stone-100 bg-white p-3 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-all hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100 mb-3">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-0.5 shadow-sm text-stone-800">
                    <Star className="h-2 w-2 text-yellow-500 fill-yellow-500" /> {p.rating}
                  </div>
                </div>
                
                <div className="flex-1 px-1">
                  <h4 className="font-bold text-stone-900 text-sm truncate" title={p.name}>{p.name}</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{p.unit}</p>
                </div>

                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="font-extrabold text-stone-900 text-sm">₹{p.price}</span>
                  <button 
                    onClick={() => handleAddSuggested(p)}
                    className="h-8 w-8 rounded-full bg-stone-900 flex items-center justify-center text-white hover:bg-[#D2F34C] hover:text-stone-900 transition-all shadow-md active:scale-90"
                    title="Add to cart"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}