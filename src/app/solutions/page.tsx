export default function SolutionsPage() {
  const solutions = [
    { title: "Precision Farming", desc: "Satellite insights and micro-climate data to optimize inputs and maximize yields.", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22l12-12"/><path d="M14 10l7-7"/><path d="M3 21l6-6"/></svg>
    )},
    { title: "Soil Testing AI", desc: "Analyze soil samples and receive actionable recommendations instantly.", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l4 4-4 4-4-4 4-4z"/><path d="M16 6l6 6-4 4-6-6"/></svg>
    )},
    { title: "Drone Mapping", desc: "High-resolution aerial maps for pest detection and irrigation planning.", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M7 20h10"/></svg>
    )},
    { title: "Kisan Credit", desc: "Instant credit access with fair rates for trusted farmers.", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
    )},
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative w-full bg-stone-950 text-white py-20 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-800 bg-stone-900/50 px-3 py-1 text-[#D2F34C] backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#D2F34C] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider">Solutions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight">Agriculture, Modernized</h1>
          <p className="mt-4 text-stone-400 max-w-2xl">Powerful tools for farmers, co-ops, and buyers to digitize operations and maximize outcomes.</p>
          <div className="mt-8 flex gap-4">
            <a href="/" className="rounded-full bg-[#D2F34C] px-6 py-3 text-sm font-bold text-stone-900 hover:bg-[#c2e830] transition-transform hover:scale-105">Back to Home</a>
            <a href="/marketplace" className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white/90 hover:bg-white/10 hover:text-white">Visit Marketplace</a>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((s, idx) => (
              <div key={idx} className="group relative flex flex-col rounded-[2rem] border border-stone-100 bg-white p-6 shadow-sm transition-all hover:border-stone-200 hover:shadow-xl">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-900">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{s.title}</h3>
                <p className="text-stone-600">{s.desc}</p>
                <div className="mt-6">
                  <a href="#" className="text-sm font-bold text-[#8ba324] hover:text-[#6f8e1b]">Learn more →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}