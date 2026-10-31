"use client";

const sports = [
  { name: "Football", icon: "⚽", bg: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { name: "Badminton", icon: "🏸", bg: "bg-amber-50 text-amber-700 border-amber-100" },
  { name: "Tennis", icon: "🎾", bg: "bg-orange-50 text-orange-600 border-orange-100" },
  { name: "Swimming", icon: "🏊‍♂️", bg: "bg-cyan-50 text-cyan-600 border-cyan-100" },
  { name: "Basketball", icon: "🏀", bg: "bg-rose-50 text-rose-600 border-rose-100" },
  { name: "Cricket", icon: "🏏", bg: "bg-blue-50 text-blue-600 border-blue-100" },
];

export default function PopularSports() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Popular Sports</h2>
        <p className="text-slate-500 mb-10">Find facilities for every sport you love</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {sports.map((sport, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all hover:scale-105 cursor-pointer shadow-sm ${sport.bg}`}
            >
              <span className="text-4xl mb-3">{sport.icon}</span>
              <span className="font-semibold text-sm">{sport.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}