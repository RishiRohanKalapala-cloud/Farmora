"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Plus, 
  Trash2, 
  Store, 
  Search, 
  X, 
  UploadCloud, 
  IndianRupee, 
  Image as ImageIcon,
  MoreVertical,
  ArrowRight,
  Filter,
  CheckCircle2
} from "lucide-react";

// --- Types ---
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  description?: string;
  image?: string;
  sellerEmail?: string;
  views?: number; // Mock stat
  stock?: number; // Mock stat
};

// --- Helpers ---
function readProducts(): Product[] {
  try {
    const raw = localStorage.getItem("farmora_products");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeProducts(items: Product[]) {
  localStorage.setItem("farmora_products", JSON.stringify(items));
}
function getUser(): { email?: string; role?: string } | null {
  try {
    const raw = localStorage.getItem("farmora_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// --- Components ---

// 1. Stat Card
const StatCard = ({ label, value, icon: Icon, trend }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm flex items-center justify-between group hover:border-[#D2F34C] transition-colors">
    <div>
      <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-extrabold text-stone-900 mt-1">{value}</p>
      {trend && <p className="text-xs font-medium text-green-600 mt-1">{trend}</p>}
    </div>
    <div className="h-10 w-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-[#D2F34C] group-hover:text-stone-900 transition-colors">
      <Icon className="h-5 w-5" />
    </div>
  </div>
);

export default function SellerDashboard() {
  const router = useRouter();
  const user = useMemo(() => getUser(), []);
  
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [price, setPrice] = useState(""); 
  const [unit, setUnit] = useState("kg");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setProducts(readProducts());
  }, []);

  const myProducts = useMemo(
    () => products.filter((p) => p.sellerEmail === user?.email),
    [products, user?.email]
  );

  const filteredProducts = useMemo(() => {
    return myProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [myProducts, searchQuery]);

  const canSell = user?.role === "farmer";

  // Handlers
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    
    const newItem: Product = {
      id: `${Date.now()}`,
      name,
      category,
      price: Number(price),
      unit,
      description,
      image,
      sellerEmail: user?.email,
      views: 0,
      stock: 50
    };
    
    const updated = [newItem, ...products];
    setProducts(updated);
    writeProducts(updated);
    
    // Reset & Close
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
    setIsDrawerOpen(false);
  };

  const handleRemove = (id: string) => {
    if(confirm("Remove this listing?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      writeProducts(updated);
    }
  };

  // --- Render: Non-Farmer State ---
  if (!canSell) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200 p-8 text-center">
           <Store className="h-12 w-12 text-stone-300 mx-auto mb-4" />
           <h2 className="text-xl font-bold text-stone-900">Seller Access Only</h2>
           <p className="text-stone-500 mb-6 mt-2">Please sign in with a Farmer account to access the dashboard.</p>
           <button
              className="w-full rounded-xl bg-stone-900 text-white px-4 py-3 font-bold hover:bg-stone-800"
              onClick={() => {
                if (user?.email) {
                  localStorage.setItem("farmora_user", JSON.stringify({ email: user.email, role: "farmer" }));
                  location.reload();
                } else {
                  router.push("/sign-in");
                }
              }}
            >
              Demo: Switch to Farmer
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] font-sans text-stone-900 selection:bg-[#D2F34C] selection:text-stone-900">
      
      {/* --- Top Navigation --- */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[#D2F34C] rounded-lg flex items-center justify-center">
               <Store className="h-4 w-4 text-stone-900" />
            </div>
            <span className="font-bold text-lg tracking-tight">Seller Hub</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 text-xs font-medium text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full">
               <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
               Live System
             </div>
             <Link href="/" className="text-sm font-bold text-stone-600 hover:text-stone-900">
               Exit
             </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* --- 1. Dashboard Controls --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
           <div>
             <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Overview</h1>
             <p className="text-stone-500 mt-1">Manage your inventory and track performance.</p>
           </div>
           
           <div className="flex items-center gap-3">
             <div className="relative group hidden sm:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 group-focus-within:text-stone-900" />
               <input 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:border-[#D2F34C] w-64 transition-all"
                 placeholder="Search listings..."
               />
             </div>
             
             {/* Primary Action Button */}
             <button 
               onClick={() => setIsDrawerOpen(true)}
               className="flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-stone-900/20 hover:bg-stone-800 hover:-translate-y-0.5 transition-all"
             >
               <Plus className="h-4 w-4" /> Add Produce
             </button>
           </div>
        </div>

        {/* --- 2. Stats Row --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
           <StatCard label="Total Products" value={myProducts.length} icon={Store} trend="+2 this week" />
           <StatCard label="Total Revenue" value="₹12.4k" icon={IndianRupee} trend="+12% vs last month" />
           <StatCard label="Active Orders" value="8" icon={CheckCircle2} />
           <StatCard label="Total Views" value="1,240" icon={ArrowRight} />
        </div>

        {/* --- 3. Inventory Grid --- */}
        {myProducts.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-stone-200 bg-white/50 p-16 text-center flex flex-col items-center">
             <div className="h-16 w-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                <Store className="h-8 w-8 text-stone-400" />
             </div>
             <h3 className="text-xl font-bold text-stone-900">Your store is empty</h3>
             <p className="text-stone-500 max-w-sm mt-2 mb-6">Start your journey by adding your first fresh produce listing to the marketplace.</p>
             <button onClick={() => setIsDrawerOpen(true)} className="text-[#7aa808] font-bold hover:underline">
               + Create first listing
             </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredProducts.map((p) => (
               <div key={p.id} className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-[#D2F34C] hover:shadow-xl hover:shadow-[#D2F34C]/10 transition-all duration-300 flex flex-col">
                  {/* Card Image */}
                  <div className="relative h-48 bg-stone-100 overflow-hidden">
                     {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     ) : (
                        <div className="h-full w-full flex items-center justify-center text-stone-300">
                           <ImageIcon className="h-10 w-10" />
                        </div>
                     )}
                     <div className="absolute top-3 right-3">
                        <button className="h-8 w-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-stone-600 hover:text-stone-900">
                           <MoreVertical className="h-4 w-4" />
                        </button>
                     </div>
                     <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-1 rounded-md bg-stone-900/80 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider">
                           {p.category}
                        </span>
                     </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-1">
                     <div className="flex-1">
                        <h3 className="font-bold text-stone-900 text-lg line-clamp-1">{p.name}</h3>
                        <p className="text-stone-500 text-xs mt-1 line-clamp-2">{p.description || "No description."}</p>
                     </div>
                     
                     <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                        <div>
                           <p className="text-xs font-bold text-stone-400 uppercase">Price</p>
                           <p className="font-extrabold text-stone-900">₹{p.price}<span className="text-xs font-medium text-stone-500">/{p.unit}</span></p>
                        </div>
                        <button 
                           onClick={() => handleRemove(p.id)}
                           className="p-2 rounded-lg bg-stone-50 text-stone-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                           title="Delete Listing"
                        >
                           <Trash2 className="h-4 w-4" />
                        </button>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        )}
      </main>

      {/* --- ADD PRODUCT DRAWER (Overlay) --- */}
      {/* Background Dim */}
      <div 
        className={`fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Slide-out Panel */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
         <div className="h-full flex flex-col">
            
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
               <div>
                  <h2 className="text-xl font-bold text-stone-900">Add New Product</h2>
                  <p className="text-xs text-stone-500">Fill in the details to list your produce.</p>
               </div>
               <button onClick={() => setIsDrawerOpen(false)} className="h-8 w-8 rounded-full bg-stone-200 flex items-center justify-center hover:bg-stone-300 transition-colors">
                  <X className="h-4 w-4 text-stone-600" />
               </button>
            </div>

            {/* Scrollable Form Area */}
            <div className="flex-1 overflow-y-auto p-6">
               <form id="add-product-form" onSubmit={handleAddProduct} className="space-y-6">
                  
                  {/* Name Input */}
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-stone-500 uppercase ml-1">Product Title <span className="text-red-500">*</span></label>
                     <input 
                        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 font-medium focus:bg-white focus:border-[#D2F34C] focus:ring-4 focus:ring-[#D2F34C]/20 outline-none transition-all" 
                        placeholder="e.g. Kashmiri Apples" 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)} 
                        autoFocus
                     />
                  </div>

                  {/* Category Select */}
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-stone-500 uppercase ml-1">Category</label>
                     <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                        <select 
                           className="w-full rounded-xl border border-stone-200 bg-stone-50 pl-10 pr-4 py-3 text-stone-900 font-medium focus:bg-white focus:border-[#D2F34C] focus:ring-4 focus:ring-[#D2F34C]/20 outline-none transition-all appearance-none" 
                           value={category} 
                           onChange={(e)=>setCategory(e.target.value)}
                        >
                           <option>Vegetables</option>
                           <option>Fruits</option>
                           <option>Grains</option>
                           <option>Herbs</option>
                        </select>
                     </div>
                  </div>

                  {/* Price Row */}
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-500 uppercase ml-1">Price (₹) <span className="text-red-500">*</span></label>
                        <input 
                           type="number"
                           className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 font-medium focus:bg-white focus:border-[#D2F34C] outline-none" 
                           placeholder="0.00" 
                           value={price} 
                           onChange={(e)=>setPrice(e.target.value)} 
                        />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-500 uppercase ml-1">Unit</label>
                        <input 
                           className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 font-medium focus:bg-white focus:border-[#D2F34C] outline-none" 
                           placeholder="kg, pc, box" 
                           value={unit} 
                           onChange={(e)=>setUnit(e.target.value)} 
                        />
                     </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-stone-500 uppercase ml-1">Description</label>
                     <textarea 
                        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 font-medium focus:bg-white focus:border-[#D2F34C] outline-none h-24 resize-none" 
                        placeholder="Describe the freshness and quality..." 
                        value={description} 
                        onChange={(e)=>setDescription(e.target.value)} 
                     />
                  </div>

                  {/* Image URL */}
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-stone-500 uppercase ml-1">Image Link</label>
                     <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                        <input 
                           className="w-full rounded-xl border border-stone-200 bg-stone-50 pl-10 pr-4 py-3 text-stone-900 font-medium focus:bg-white focus:border-[#D2F34C] outline-none" 
                           placeholder="https://example.com/image.jpg" 
                           value={image} 
                           onChange={(e)=>setImage(e.target.value)} 
                        />
                     </div>
                     {image && (
                        <div className="mt-2 h-32 w-full rounded-xl bg-stone-100 overflow-hidden border border-stone-200">
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           <img src={image} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                     )}
                  </div>

               </form>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 border-t border-stone-100 bg-stone-50/50">
               <button 
                  onClick={(e) => {
                     const form = document.getElementById('add-product-form') as HTMLFormElement;
                     if(form) form.requestSubmit();
                  }}
                  className="w-full rounded-xl bg-[#D2F34C] px-6 py-4 text-sm font-bold text-stone-900 shadow-xl shadow-[#D2F34C]/20 hover:bg-[#cbf035] hover:shadow-[#D2F34C]/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
               >
                  <UploadCloud className="h-4 w-4" /> Publish Listing
               </button>
            </div>

         </div>
      </div>

    </div>
  );
}