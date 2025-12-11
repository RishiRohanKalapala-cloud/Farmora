"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Package, MapPinned, Clock } from "lucide-react";

function getOrders() {
  try {
    const raw = localStorage.getItem("farmora_orders");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getUser() {
  try {
    const raw = localStorage.getItem("farmora_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function TrackingPage() {
  const router = useRouter();
  const user = useMemo(() => getUser(), []);
  const isUser = user?.role === "user";
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!isUser) router.push("/sign-in");
  }, [isUser, router]);

  useEffect(() => {
    const all = getOrders();
    const mine = all.filter((o: any) => o?.buyer?.email === user?.email);
    setOrders(mine);
  }, [user?.email]);

  const advanceStatus = (id: string) => {
    setOrders((prev) => prev.map((o) => {
      if (o.id !== id) return o;
      const statusFlow = ["processing", "shipped", "out_for_delivery", "delivered"] as const;
      const idx = statusFlow.indexOf(o.status || "processing");
      const next = statusFlow[Math.min(idx + 1, statusFlow.length - 1)];
      const updated = { ...o, status: next, updatedAt: new Date().toISOString() };
      // persist back
      try {
        const all = getOrders();
        const merged = all.map((x: any) => x.id === id ? updated : x);
        localStorage.setItem("farmora_orders", JSON.stringify(merged));
      } catch {}
      return updated;
    }));
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

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Order Tracking</h1>
          <p className="text-stone-500">Track the progress of your purchases.</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
            <p className="text-stone-600">No orders to track yet. Visit the <Link href="/marketplace" className="font-bold underline">marketplace</Link> to start shopping.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((o) => (
              <div key={o.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase text-stone-500">Order</div>
                    <div className="font-bold">#{o.id}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span className="text-stone-600">{new Date(o.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <div className="text-xs font-bold uppercase text-stone-500">Items</div>
                    <ul className="mt-1 divide-y divide-stone-100">
                      {o.items.map((it: any) => (
                        <li key={`${it.id}-${it.qty}`} className="py-2 flex items-center gap-3">
                          <Package className="h-4 w-4" />
                          <span className="font-medium">{it.name}</span>
                          <span className="text-stone-500">x{it.qty} {it.unit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-stone-500">Status</div>
                    <div className="mt-1">
                      <div className="inline-flex items-center gap-2 rounded-xl border border-stone-200 px-3 py-1 text-sm">
                        <MapPinned className="h-4 w-4" />
                        <span className="capitalize">{(o.status || "processing").replace(/_/g, " ")}</span>
                      </div>
                      <button onClick={()=>advanceStatus(o.id)} className="mt-3 w-full rounded-xl bg-stone-900 text-white px-4 py-2 text-sm font-bold">Advance Status</button>
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