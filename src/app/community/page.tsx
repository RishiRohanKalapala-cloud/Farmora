"use client";

const testimonials = [
  { name: "Rajesh Singh", role: "Wheat Farmer, Punjab", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop", quote: "Since joining Farmora, I've eliminated middlemen. Direct buyer connections transformed my family's income.", stat: "40% Profit Increase" },
  { name: "Priya Patel", role: "Organic Wholesaler, Mumbai", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop", quote: "Farmora’s transparency and quality checks make procurement effortless.", stat: "100% Quality Verified" },
  { name: "Amit Verma", role: "Agri-Entrepreneur, MP", image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1887&auto=format&fit=crop", quote: "I track market rates and list my harvest in seconds.", stat: "Zero Food Waste" },
  { name: "Sarah Jenkins", role: "Sustainable Chef, Bangalore", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop", quote: "Farmora lets me source directly from local farms within 24 hours of harvest.", stat: "24hr Farm-to-Table" }
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative w-full bg-stone-950 text-white py-20 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-800 bg-stone-900/50 px-3 py-1 text-[#D2F34C] backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#D2F34C] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider">Community</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight">Voices from the Field</h1>
          <p className="mt-4 text-stone-400 max-w-2xl">Stories from farmers, buyers, and innovators using Farmora to modernize agriculture.</p>
          <div className="mt-8">
            <a href="/" className="rounded-full bg-[#D2F34C] px-6 py-3 text-sm font-bold text-stone-900 hover:bg-[#c2e830] transition-transform hover:scale-105">Back to Home</a>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="group relative flex flex-col rounded-[2rem] border border-stone-100 bg-white p-6 shadow-sm transition-all hover:border-stone-200 hover:shadow-xl">
                <div className="mb-4 h-16 w-16 rounded-full overflow-hidden border border-stone-200">
                  <div className="h-full w-full bg-center bg-cover" style={{ backgroundImage: `url(${t.image})` }} />
                </div>
                <p className="text-stone-600 italic mb-4">“{t.quote}”</p>
                <div className="inline-flex self-start rounded-lg bg-[#D2F34C]/10 px-3 py-1.5 border border-[#D2F34C]/20 mb-4">
                  <span className="text-xs font-bold text-[#D2F34C]">{t.stat}</span>
                </div>
                <div className="mt-auto border-t border-stone-100 pt-4">
                  <h4 className="font-bold text-stone-900">{t.name}</h4>
                  <p className="text-sm text-stone-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}