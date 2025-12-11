"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShoppingCart, 
  PlusCircle, 
  Search, 
  Heart, 
  ShoppingBag, 
  Leaf, 
  ArrowRight,
  Star,
  Loader2,
  CheckCircle2,
  ImageOff,
  User
} from "lucide-react";
import { useCart } from "@/hooks/useCart";

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

// --- Reliable Image Data (Unsplash) ---
const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Red Onions (Nashik)", category: "Vegetables", price: 35, unit: "kg", rating: 4.8, seller: "Ramesh Farms", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=600", tag: "Best Seller" },
  { id: "2", name: "Desi Tomatoes", category: "Vegetables", price: 28, unit: "kg", rating: 4.5, seller: "Green Valley", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600", tag: "Organic" },
  { id: "3", name: "Fresh Potatoes", category: "Vegetables", price: 25, unit: "kg", rating: 4.2, seller: "Earth Roots", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600" },
  { id: "4", name: "Basmati Rice", category: "Grains", price: 120, unit: "kg", rating: 4.9, seller: "Punjab Fields", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600" },
  { id: "5", name: "Green Chili", category: "Vegetables", price: 60, unit: "kg", rating: 4.6, seller: "Spicy Harvest", image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&q=80&w=600" },
  { id: "6", name: "Okra (Lady Finger)", category: "Vegetables", price: 45, unit: "kg", rating: 4.3, seller: "City Gardens", image: "https://images.unsplash.com/photo-1425543103986-226d3d8d17d8?auto=format&fit=crop&q=80&w=600" },
  { id: "7", name: "Alphonso Mangoes", category: "Fruits", price: 600, unit: "doz", rating: 5.0, seller: "Ratnagiri Orchards", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600", tag: "Seasonal" },
  { id: "8", name: "Fresh Coriander", category: "Herbs", price: 15, unit: "bunch", rating: 4.7, seller: "Daily Greens", image: "https://images.unsplash.com/photo-1588879460618-877295842894?auto=format&fit=crop&q=80&w=600" },
  { id: "9", name: "Carrots", category: "Vegetables", price: 55, unit: "kg", rating: 4.5, seller: "Highland Farms", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600" },
  { id: "10", name: "Wheat Flour", category: "Grains", price: 42, unit: "kg", rating: 4.6, seller: "Golden Harvest", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600" },
  { id: "11", name: "Spinach", category: "Vegetables", price: 30, unit: "bunch", rating: 4.4, seller: "Leafy Logic", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600" },
  { id: "12", name: "Ginger Root", category: "Vegetables", price: 180, unit: "kg", rating: 4.7, seller: "Rooted", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600" },
  { id: "13", name: "Turmeric", category: "Spices", price: 250, unit: "500g", rating: 4.9, seller: "Pure Spice Co", image: "https://images.unsplash.com/photo-1615485500704-8e99099928b3?auto=format&fit=crop&q=80&w=600" },
  { id: "14", name: "Bell Peppers", category: "Vegetables", price: 90, unit: "kg", rating: 4.3, seller: "Color Farms", image: "https://images.unsplash.com/photo-1563565375-f3fdf5dbc240?auto=format&fit=crop&q=80&w=600" },
  { id: "15", name: "Cauliflower", category: "Vegetables", price: 40, unit: "pc", rating: 4.2, seller: "Winter Greens", image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&q=80&w=600" },
  { id: "16", name: "Bananas", category: "Fruits", price: 40, unit: "doz", rating: 4.6, seller: "Kerala Fruits", image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=600" },
  { id: "17", name: "Garlic", category: "Vegetables", price: 140, unit: "kg", rating: 4.8, seller: "Flavor Town", image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=600" },
  { id: "18", name: "Toor Dal", category: "Pulses", price: 110, unit: "kg", rating: 4.5, seller: "Protein Pack", image: "https://images.unsplash.com/photo-1585996669642-88a2ce376b97?auto=format&fit=crop&q=80&w=600" },
  { id: "19", name: "Cucumber", category: "Vegetables", price: 20, unit: "kg", rating: 4.1, seller: "Cool Farms", image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&q=80&w=600" },
  { id: "20", name: "Watermelon", category: "Fruits", price: 50, unit: "pc", rating: 4.7, seller: "Summer Sweet", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600" },
];

// --- Components ---

// 1. Robust Image Component
const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} bg-stone-100 flex flex-col items-center justify-center text-stone-400`}>
        <ImageOff className="h-8 w-8 mb-2 opacity-50" />
        <span className="text-[10px] font-medium uppercase tracking-widest">No Image</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)}
      loading="lazy"
    />
  );
};

// 2. Toast Notification
const Toast = ({ show, message }: { show: boolean; message: string }) => {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="flex items-center gap-3 bg-stone-900 text-white px-5 py-3 rounded-full shadow-2xl">
        <div className="bg-[#D2F34C] rounded-full p-1">
          <CheckCircle2 className="h-4 w-4 text-stone-900" />
        </div>
        <span className="text-sm font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default function MarketplacePage() {
  const router = useRouter();
  const { addItem, count } = useCart();
  
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: "" });

  // Init Data
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem("farmora_products");
        const listed = raw ? JSON.parse(raw) : [];
        const normalized: Product[] = listed.map((p: any) => ({
          id: String(p.id ?? `fp_${Date.now()}`),
          name: String(p.name ?? "Fresh Produce"),
          category: String(p.category ?? "Misc"),
          price: Number(p.price ?? 0),
          unit: String(p.unit ?? "kg"),
          rating: 4.6,
          seller: p.sellerEmail ? String(p.sellerEmail).split("@")[0] : "Local Farmer",
          image: p.image ? String(p.image) : "/images/placeholder.png",
        }));
        setProducts([...MOCK_PRODUCTS, ...normalized]);
      } catch {
        setProducts(MOCK_PRODUCTS);
      }
    };

    load();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "farmora_products") load();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Filter Logic
  const categories = useMemo(() => {
    const cats = new Set<string>(["All"]);
    products.forEach((p) => cats.add(p.category));
    return Array.from(cats);
  }, [products]);

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
  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3000);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      unit: product.unit,
      img: product.image,
      farmer: product.seller,
    });
    showToast(`Added ${product.name} to cart`);
  };

  const handleBuyNow = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      unit: product.unit,
      img: product.image,
      farmer: product.seller,
    });
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-[#D2F34C] selection:text-stone-900">
      
      {/* Toast */}
      <Toast show={toast.show} message={toast.msg} />

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-[#D2F34C] p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-[#D2F34C]/20">
              <Leaf className="h-5 w-5 text-stone-900 fill-stone-900/10" />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900">Farmora</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-stone-400 group-focus-within:text-[#7aa808] transition-colors" />
            </div>
            <input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-11 rounded-full border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm focus:border-[#D2F34C] focus:bg-white focus:ring-4 focus:ring-[#D2F34C]/20 focus:outline-none transition-all placeholder:text-stone-400"
              placeholder="Search for fresh vegetables, fruits..."
            />
          </div>

          <div className="flex items-center gap-5">
            <Link href="/user" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors">
              <User className="h-4 w-4" /> 
              Dashboard
            </Link>
            <Link href="/seller" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors">
              <PlusCircle className="h-4 w-4" /> 
              Sell Item
            </Link>
            
            {/* Cart Link with Badge */}
            <Link href="/cart" className="relative group">
              <div className="h-10 w-10 rounded-full bg-white border border-stone-200 flex items-center justify-center group-hover:border-[#D2F34C] group-hover:bg-[#D2F34C] transition-all shadow-sm">
                <ShoppingCart className="h-5 w-5 text-stone-700 group-hover:text-stone-900 transition-colors" />
              </div>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white ring-2 ring-white animate-in zoom-in">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* --- HERO CONTROLS --- */}
      <section className="pt-8 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900">
              Fresh Market
            </h1>
            <p className="mt-2 text-stone-500 font-medium">
              Quality produce sourced directly from farmers.
            </p>
          </div>
          
          {/* Mobile Search */}
          <div className="md:hidden w-full relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
             <input 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               className="w-full p-3 pl-10 rounded-xl border border-stone-200 bg-white" 
               placeholder="Search items..." 
             />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="relative">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide mask-fade-right">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`
                  whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
                  ${activeCategory === c 
                    ? "bg-stone-900 text-white border-stone-900 shadow-lg shadow-stone-900/20 scale-105" 
                    : "bg-white text-stone-600 border-stone-200 hover:border-[#D2F34C] hover:bg-[#D2F34C]/10"}
                `}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRODUCT GRID --- */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-stone-100 shadow-sm">
            <div className="h-20 w-20 bg-stone-50 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-stone-300" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">No products found</h3>
            <p className="text-stone-500 mt-1 max-w-xs mx-auto">We couldn't find matches for "{query}". Try a different category.</p>
            <button onClick={() => {setQuery(""); setActiveCategory("All")}} className="mt-6 text-[#7aa808] font-bold hover:underline">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <div 
                key={p.id} 
                className="group relative flex flex-col bg-white rounded-[24px] border border-stone-100 shadow-sm transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 overflow-hidden"
              >
                
                {/* Image Area with Zoom Effect */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <ImageWithFallback 
                    src={p.image} 
                    alt={p.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                     {p.tag && (
                       <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-stone-900 shadow-sm border border-white/50">
                         {p.tag}
                       </span>
                     )}
                  </div>
                  
                  {/* Like Button (Functional) */}
                  <button 
                    onClick={(e) => handleLike(p.id, e)}
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 shadow-sm active:scale-90"
                  >
                    <Heart 
                      className={`h-4 w-4 transition-colors duration-300 ${likedItems.has(p.id) ? "fill-red-500 text-red-500" : "text-stone-500"}`} 
                    />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex-1 space-y-2">
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-[#7aa808]">{p.category}</span>
                       <div className="flex items-center gap-1 text-xs font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                         <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {p.rating}
                       </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-stone-900 leading-tight group-hover:text-[#7aa808] transition-colors line-clamp-1">
                      {p.name}
                    </h3>
                    
                    {/* Seller */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <div className="h-4 w-4 rounded-full bg-stone-200 flex items-center justify-center text-[9px] font-bold text-stone-600">
                        {p.seller.charAt(0)}
                      </div>
                      <span className="truncate">By {p.seller}</span>
                    </div>
                  </div>

                  {/* Price & Actions Row */}
                  <div className="mt-5 flex items-end justify-between border-t border-stone-100 pt-4">
                    <div>
                      <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider">Price</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-extrabold text-stone-900">₹{p.price}</span>
                        <span className="text-xs text-stone-500 font-semibold">/{p.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Add to Cart (Icon) */}
                      <button 
                         onClick={(e) => handleAddToCart(e, p)}
                         className="h-10 w-10 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-600 hover:border-[#D2F34C] hover:bg-[#D2F34C] hover:text-stone-900 hover:shadow-lg hover:shadow-[#D2F34C]/20 transition-all active:scale-95"
                         title="Add to Cart"
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </button>
                      
                      {/* Buy Now (Pill) */}
                      <button 
                         onClick={(e) => handleBuyNow(e, p)}
                         className="h-10 px-5 rounded-full bg-stone-900 text-white text-sm font-bold shadow-lg hover:bg-stone-800 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        Buy <ArrowRight className="h-3 w-3 opacity-70" />
                      </button>
                    </div>
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