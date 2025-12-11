"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Leaf, 
  ShoppingBag, 
  Truck, 
  Star, 
  User, 
  Package, 
  Clock, 
  ChevronRight, 
  CreditCard,
  Settings,
  LogOut,
  MapPin,
  HelpCircle,
  MessageCircle // <--- Added missing import
} from "lucide-react";

// --- Types ---
type OrderItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
  unit: string;
  img?: string;
};

type Order = {
  id: string;
  total: number;
  status: "processing" | "shipped" | "delivered";
  createdAt: string;
  items: OrderItem[];
};

// --- Helpers ---
function getUser() {
  try {
    const raw = localStorage.getItem("farmora_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function readOrders(): Order[] {
  try {
    const raw = localStorage.getItem("farmora_orders");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// --- Components ---

const CompactStat = ({ label, value, icon: Icon, colorClass }: any) => (
  <div className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm flex items-center justify-between hover:border-stone-300 transition-colors">
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{label}</span>
      <span className="text-xl font-extrabold text-stone-900 leading-tight mt-0.5">{value}</span>
    </div>
    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${colorClass}`}>
      <Icon className="h-5 w-5" />
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    processing: "bg-amber-50 text-amber-700 border-amber-100",
    shipped: "bg-blue-50 text-blue-700 border-blue-100",
    delivered: "bg-green-50 text-green-700 border-green-100",
  };
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  const style = styles[status as keyof typeof styles] || styles.processing;

  return (
    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1.5 uppercase tracking-wide ${style}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
};

// Helper Component for Menu Items
const MenuItem = ({ icon: Icon, label }: any) => (
  <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors group">
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-stone-400 group-hover:text-stone-600" />
      {label}
    </div>
    <ChevronRight className="h-3 w-3 text-stone-300 group-hover:text-stone-500" />
  </button>
);

export default function UserDashboardPage() {
  const router = useRouter();
  const user = useMemo(() => getUser(), []);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // In real app: if (!user) router.push('/sign-in')
    setOrders(readOrders());
  }, []);

  const totalSpent = useMemo(() => orders.reduce((sum, o) => sum + (o.total || 0), 0), [orders]);
  const activeOrders = useMemo(() => orders.filter(o => o.status !== "delivered").length, [orders]);
  const rewardPoints = Math.round(totalSpent * 0.1); 

  return (
    <div className="min-h-screen bg-[#F5F5F4] font-sans text-stone-900 selection:bg-[#D2F34C] selection:text-stone-900">
      
      {/* --- Compact Header --- */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-[#D2F34C] rounded-lg flex items-center justify-center shadow-sm">
              <Leaf className="h-4 w-4 text-stone-900" />
            </div>
            <span className="font-bold text-lg tracking-tight">Farmora</span>
          </Link>
          
          <nav className="flex items-center gap-6 text-sm font-semibold text-stone-500">
            <Link href="/marketplace" className="hover:text-stone-900 transition-colors hidden sm:block">Marketplace</Link>
            <div className="h-8 w-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600">
              <User className="h-4 w-4" />
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        
        {/* --- Header Section --- */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-stone-900">
              Overview
            </h1>
            <p className="text-sm text-stone-500 font-medium">Welcome back, {user?.email?.split('@')[0] || "Guest"}</p>
          </div>
          <button onClick={() => router.push('/marketplace')} className="bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-stone-800 transition-all shadow-sm">
            + New Order
          </button>
        </div>

        {/* --- Compact Stats Row --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <CompactStat label="Orders" value={orders.length} icon={Package} colorClass="bg-blue-50 text-blue-600" />
          <CompactStat label="Active" value={activeOrders} icon={Truck} colorClass="bg-amber-50 text-amber-600" />
          <CompactStat label="Spent" value={`₹${totalSpent.toLocaleString()}`} icon={CreditCard} colorClass="bg-stone-100 text-stone-600" />
          <CompactStat label="Points" value={rewardPoints} icon={Star} colorClass="bg-[#D2F34C]/20 text-stone-900" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* --- LEFT COLUMN: Order History (lg:col-span-8) --- */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between px-1">
               <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                 Recent Activity
               </h2>
               <button className="text-xs font-bold text-stone-400 hover:text-stone-900 uppercase tracking-wide">View All</button>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 border-dashed p-10 text-center">
                 <ShoppingBag className="h-8 w-8 text-stone-300 mx-auto mb-3" />
                 <h3 className="text-sm font-bold text-stone-900">No orders yet</h3>
                 <p className="text-xs text-stone-500 mt-1 mb-4">Your purchase history will appear here.</p>
                 <Link href="/marketplace" className="text-xs font-bold text-[#7aa808] hover:underline">Start Shopping</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="bg-white rounded-2xl border border-stone-200/60 p-4 hover:border-stone-300 transition-all shadow-sm">
                    {/* Top Row: ID, Date, Status */}
                    <div className="flex items-center justify-between mb-3 border-b border-stone-50 pb-3">
                       <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">#{o.id.slice(-4)}</span>
                          <span className="text-xs text-stone-400 font-medium hidden sm:inline-block">{new Date(o.createdAt).toLocaleDateString()}</span>
                       </div>
                       <StatusBadge status={o.status || "processing"} />
                    </div>

                    {/* Middle Row: Items & Total */}
                    <div className="flex items-center justify-between gap-4">
                       <div className="flex -space-x-2 overflow-hidden">
                          {/* Item Preview Thumbnails */}
                          {o.items.slice(0, 3).map((it, idx) => (
                             <div key={idx} className="h-8 w-8 rounded-full border-2 border-white bg-stone-100 overflow-hidden relative" title={it.name}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={it.img || "/placeholder.png"} className="h-full w-full object-cover" alt="" />
                             </div>
                          ))}
                          {o.items.length > 3 && (
                             <div className="h-8 w-8 rounded-full border-2 border-white bg-stone-50 flex items-center justify-center text-[10px] font-bold text-stone-500">
                                +{o.items.length - 3}
                             </div>
                          )}
                          <div className="flex flex-col justify-center pl-3">
                             <span className="text-sm font-bold text-stone-900">{o.items[0].name}</span>
                             {o.items.length > 1 && <span className="text-[10px] text-stone-500">and {o.items.length - 1} others</span>}
                          </div>
                       </div>
                       
                       <div className="text-right">
                          <span className="block text-sm font-extrabold text-stone-900">₹{o.total.toFixed(0)}</span>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT COLUMN: Sidebar (lg:col-span-4) --- */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Minimal Rewards Card */}
            <div className="relative overflow-hidden rounded-2xl bg-stone-900 p-5 text-white shadow-lg">
               <div className="absolute top-0 right-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-[#D2F34C] opacity-10 blur-2xl"></div>
               <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">Rewards Balance</p>
                    <h3 className="text-2xl font-extrabold tracking-tight mt-0.5">{rewardPoints.toLocaleString()}</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Star className="h-4 w-4 text-[#D2F34C]" />
                  </div>
               </div>
               <button className="mt-4 w-full rounded-lg bg-[#D2F34C] py-2 text-xs font-bold text-stone-900 hover:bg-[#cbf035]">
                  Redeem Points
               </button>
            </div>

            {/* Clean Menu List */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
               <div className="p-3">
                  <h3 className="px-2 pb-2 text-[10px] font-bold uppercase text-stone-400 tracking-wider">Account</h3>
                  <div className="space-y-0.5">
                    <MenuItem icon={User} label="Profile Information" />
                    <MenuItem icon={MapPin} label="Saved Addresses" />
                    <MenuItem icon={CreditCard} label="Payment Methods" />
                  </div>

                  <h3 className="px-2 pb-2 pt-4 text-[10px] font-bold uppercase text-stone-400 tracking-wider">Support</h3>
                  <div className="space-y-0.5">
                    <MenuItem icon={HelpCircle} label="Help Center" />
                    <MenuItem icon={MessageCircle} label="Contact Support" />
                  </div>

                  <div className="mt-2 pt-2 border-t border-stone-100">
                    <button 
                      onClick={() => { localStorage.removeItem("farmora_user"); router.push("/sign-in"); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
               </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}