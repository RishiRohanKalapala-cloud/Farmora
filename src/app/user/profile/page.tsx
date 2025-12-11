"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, User, Mail, Phone, MapPin, Edit, Save } from "lucide-react";

function getUser() {
  try {
    const raw = localStorage.getItem("farmora_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function ProfilePage() {
  const router = useRouter();
  const user = useMemo(() => getUser(), []);
  const isUser = user?.role === "user";

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!isUser) {
      router.push("/sign-in");
    }
  }, [isUser, router]);

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...user, name, email, phone, address, role: "user" };
    localStorage.setItem("farmora_user", JSON.stringify(updated));
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-[#D2F34C] selection:text-stone-900">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[#D2F34C] rounded-lg flex items-center justify-center">
              <Leaf className="h-4 w-4 text-stone-900" />
            </div>
            <span className="font-bold">Farmora</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/user" className="font-bold text-stone-600 hover:text-stone-900">Dashboard</Link>
            <Link href="/marketplace" className="font-bold text-stone-600 hover:text-stone-900">Marketplace</Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Profile</h1>
          <p className="text-stone-500">Manage your personal information and preferences.</p>
        </div>

        <form onSubmit={saveProfile} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold uppercase text-stone-500 ml-1">Full Name</label>
              <input 
                disabled={!editing}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-[#D2F34C] focus:outline-none" 
                value={name} 
                onChange={(e)=>setName(e.target.value)} 
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-stone-500 ml-1">Email</label>
              <input 
                type="email"
                disabled={!editing}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-[#D2F34C] focus:outline-none" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-stone-500 ml-1">Phone</label>
              <input 
                disabled={!editing}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-[#D2F34C] focus:outline-none" 
                value={phone} 
                onChange={(e)=>setPhone(e.target.value)} 
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase text-stone-500 ml-1">Address</label>
              <textarea 
                disabled={!editing}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-[#D2F34C] focus:outline-none min-h-[120px]" 
                value={address} 
                onChange={(e)=>setAddress(e.target.value)} 
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!editing ? (
              <button type="button" onClick={()=>setEditing(true)} className="rounded-xl bg-stone-900 text-white px-4 py-2 text-sm font-bold flex items-center gap-2">
                <Edit className="h-4 w-4" /> Edit
              </button>
            ) : (
              <button type="submit" className="rounded-xl bg-[#D2F34C] text-stone-900 px-4 py-2 text-sm font-bold flex items-center gap-2">
                <Save className="h-4 w-4" /> Save
              </button>
            )}
            <button type="button" onClick={()=>router.push("/user")} className="rounded-xl bg-stone-100 text-stone-900 px-4 py-2 text-sm font-bold">Cancel</button>
          </div>
        </form>
      </main>
    </div>
  );
}