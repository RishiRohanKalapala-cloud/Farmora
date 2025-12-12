"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // <--- FIXED: Imported here
import { 
  ShoppingCart, 
  PlusCircle, 
  Search, 
  Heart, 
  Sprout, 
  ArrowRight,
  Star,
  CheckCircle2,
  ImageOff,
  User,
  SlidersHorizontal,
  X,
  Trash2,
  Plus,
  Minus
} from "lucide-react";
import { useCart } from "@/hooks/useCart"; // Assuming you have this hook

// --- Types ---
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  rating: number;
  seller: string;
  image: string;
  tag?: string;
};

// --- Mock Data ---
const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Red Onions (Nashik)", category: "Vegetables", price: 35, unit: "kg", rating: 4.8, seller: "Ramesh Farms", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=600", tag: "Best Seller" },
  { id: "2", name: "Desi Tomatoes", category: "Vegetables", price: 28, unit: "kg", rating: 4.5, seller: "Green Valley", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600", tag: "Organic" },
  { id: "3", name: "Fresh Potatoes", category: "Vegetables", price: 25, unit: "kg", rating: 4.2, seller: "Earth Roots", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600" },
  { id: "4", name: "Basmati Rice", category: "Grains", price: 120, unit: "kg", rating: 4.9, seller: "Punjab Fields", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600" },
  { id: "5", name: "Alphonso Mangoes", category: "Fruits", price: 600, unit: "doz", rating: 5.0, seller: "Ratnagiri Orchards", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600", tag: "Seasonal" },
  { id: "6", name: "Fresh Coriander", category: "Herbs", price: 15, unit: "bunch", rating: 4.7, seller: "Daily Greens", image: "https://image.myupchar.com/576/original/dhaniya-ke-fayde-aur-nuksan-in-hindi-1.jpg" },
  { id: "7", name: "Wheat Flour", category: "Grains", price: 42, unit: "kg", rating: 4.6, seller: "Golden Harvest", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600" },
];

// --- Helper Components ---

const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [error, setError] = useState(false);
  return error ? (
    <div className={`${className} bg-stone-100 flex flex-col items-center justify-center text-stone-300`}>
      <ImageOff className="h-8 w-8 mb-2 opacity-50" />
      <span className="text-[10px] font-bold uppercase tracking-widest">No Image</span>
    </div>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} onError={() => setError(true)} loading="lazy" />
  );
};

export default function MarketplacePage() {
  const router = useRouter(); // <--- FIXED: Initialized here
  
  // Cart Hook Destructuring (Update this based on your actual hook)
  // If your useCart doesn't expose 'items' or 'removeItem', you need to update the hook file.
  const { items, count, addItem, removeItem, updateQty } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false); // <--- State for Side Drawer

  // Load Data
  useEffect(() => {
    const loadProducts = () => {
      const localData = localStorage.getItem("farmora_products");
      const userProducts = localData ? JSON.parse(localData) : [];
      setProducts([...userProducts, ...MOCK_PRODUCTS]);
    };
    loadProducts();
    window.addEventListener("storage", loadProducts);
    return () => window.removeEventListener("storage", loadProducts);
  }, []);

  // Filters
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery = query 
        ? (p.name.toLowerCase().includes(query.toLowerCase()) || p.seller.toLowerCase().includes(query.toLowerCase())) 
        : true;
      const matchesCategory = activeCategory === "All" ? true : p.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, activeCategory]);

  // Handlers
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      qty: 1, 
      unit: product.unit, 
      img: product.image, 
      farmer: product.seller 
    });
    setIsCartOpen(true); // Open cart automatically on add
  };

  const cartTotal = items?.reduce((acc: number, item: any) => acc + (item.price * item.qty), 0) || 0;

  return (
    <div className="min-h-screen bg-[#FAFAF9] font-sans text-stone-900 selection:bg-[#D2F34C] selection:text-stone-900">
      
      {/* --- CART DRAWER (RIGHT SIDE) --- */}
      <div className={`fixed inset-0 z-50 transform transition-all duration-500 ease-in-out ${isCartOpen ? "visible" : "invisible"}`}>
        {/* Backdrop */}
        <div 
          onClick={() => setIsCartOpen(false)} 
          className={`absolute inset-0 bg-stone-900/20 backdrop-blur-sm transition-opacity duration-500 ${isCartOpen ? "opacity-100" : "opacity-0"}`} 
        />
        
        {/* Drawer Panel */}
        <div className={`absolute right-0 top-0 h-full w-full max-w-[400px] bg-white shadow-2xl transform transition-transform duration-500 ease-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col h-full">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <h2 className="text-xl font-bold text-stone-900">Your Cart ({count})</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <X className="h-5 w-5 text-stone-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items && items.length > 0 ? (
                items.map((item: any) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-stone-100">
                      <ImageWithFallback src={item.img} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-stone-900 line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-stone-500">From {item.farmer}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-stone-50 rounded-lg p-1">
                          <button 
                            onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                            className="p-1 hover:bg-white rounded-md shadow-sm transition-all"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                          <button 
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="p-1 hover:bg-white rounded-md shadow-sm transition-all"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-stone-900">₹{item.price * item.qty}</p>
                          <button onClick={() => removeItem(item.id)} className="text-[10px] text-red-500 hover:underline">Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                  <ShoppingCart className="h-12 w-12 text-stone-300" />
                  <p className="text-stone-500 font-medium">Your cart is empty</p>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-stone-100 bg-stone-50/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-stone-500 font-medium">Subtotal</span>
                <span className="text-xl font-extrabold text-stone-900">₹{cartTotal}</span>
              </div>
              <button 
                onClick={() => router.push("/checkout")}
                disabled={!items || items.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-[#D2F34C] hover:bg-[#cbf035] text-stone-900 font-bold py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-stone-200/50">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 bg-[#D2F34C] rounded-lg flex items-center justify-center text-stone-900 shadow-[0_0_15px_rgba(210,243,76,0.3)]">
              <Sprout size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900">Farmora</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 group-focus-within:text-stone-900 transition-colors" />
            <input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-11 rounded-full bg-stone-100 border-none pl-11 pr-4 text-sm font-medium placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#D2F34C]/50 transition-all"
              placeholder="Search vegetables, fruits, grains..."
            />
          </div>

          <div className="flex items-center gap-4">
            <Link href="/seller" className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors bg-stone-100 hover:bg-stone-200 px-4 py-2.5 rounded-full">
              <PlusCircle className="h-4 w-4" /> 
              Sell Item
            </Link>

            {/* CART TRIGGER BUTTON */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative group p-2 hover:bg-stone-100 rounded-full transition-colors"
            >
              <ShoppingCart className="h-6 w-6 text-stone-700 group-hover:text-stone-900 transition-colors" />
              {count > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center rounded-full bg-[#D2F34C] text-[10px] font-bold text-stone-900 ring-2 ring-white animate-in zoom-in">
                  {count}
                </span>
              )}
            </button>

            <div className="h-9 w-9 rounded-full bg-stone-900 flex items-center justify-center text-white cursor-pointer hover:bg-stone-800 transition-colors">
                <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <section className="pt-10 pb-8 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900">
              Fresh Harvest
            </h1>
            <p className="text-lg text-stone-500 font-medium max-w-lg">
              Handpicked produce directly from local fields to your doorstep.
            </p>
          </div>
          {/* Mobile Search */}
          <div className="md:hidden w-full relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
             <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full p-3.5 pl-11 rounded-2xl bg-white border border-stone-200 shadow-sm" placeholder="Search items..." />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-stone-200 bg-white text-stone-500 mr-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wide">Filters</span>
            </div>
            {categories.map((c) => (
              <button key={c} onClick={() => setActiveCategory(c)} className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === c ? "bg-stone-900 text-white shadow-lg shadow-stone-900/20 scale-105" : "bg-white text-stone-500 border border-stone-200 hover:border-stone-300 hover:text-stone-900"}`}>
                {c}
              </button>
            ))}
        </div>
      </section>

      {/* --- GRID --- */}
      <main className="max-w-[1400px] mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center rounded-[2.5rem] border border-dashed border-stone-200 bg-white/50">
            <Search className="h-6 w-6 text-stone-400 mb-4" />
            <h3 className="text-lg font-bold text-stone-900">No results found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
            {filtered.map((p) => (
              <div key={p.id} className="group relative flex flex-col bg-white rounded-[2rem] border border-stone-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                    <ImageWithFallback src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        {p.tag ? <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-stone-900 shadow-sm">{p.tag}</span> : <div />}
                        <button onClick={(e) => { e.stopPropagation(); setLikedItems(prev => { const n = new Set(prev); n.has(p.id) ? n.delete(p.id) : n.add(p.id); return n; })}} className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm hover:bg-white"><Heart className={`h-4 w-4 transition-colors ${likedItems.has(p.id) ? "fill-red-500 text-red-500" : "text-stone-400"}`} /></button>
                    </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                             <div className="flex items-center gap-1 text-[10px] font-bold bg-stone-100 px-2 py-0.5 rounded-full text-stone-600"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {p.rating}</div>
                             <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{p.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-stone-900 leading-tight mb-1 truncate">{p.name}</h3>
                        <p className="text-xs text-stone-500 font-medium">By {p.seller}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <div><div className="flex items-baseline gap-1"><span className="text-lg font-extrabold text-stone-900">₹{p.price}</span><span className="text-xs text-stone-400 font-semibold">/{p.unit}</span></div></div>
                        <button onClick={(e) => handleAddToCart(e, p)} className="group/btn relative h-10 px-5 rounded-full bg-stone-900 text-white flex items-center gap-2 overflow-hidden shadow-lg shadow-stone-900/20 active:scale-95 transition-all hover:bg-[#D2F34C] hover:text-stone-900">
                            <span className="text-xs font-bold uppercase tracking-wide">Add</span>
                            <ShoppingCart className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
