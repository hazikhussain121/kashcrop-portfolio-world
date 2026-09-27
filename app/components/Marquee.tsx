export function Marquee({
  items,
  reverse = false,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  const row = [...items, ...items, ...items];
  return (
    <div className="edge-fade-x relative flex overflow-hidden border-y border-line py-6">
      <div
        className={`flex shrink-0 items-center gap-10 whitespace-nowrap ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-3xl text-bone-dim md:text-5xl">
              {item}
            </span>
            <span className="text-red">·</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { to { transform: translateX(-33.333%); } }
        @keyframes marquee-rev { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
        .animate-marquee { animation: marquee 28s linear infinite; }
        .animate-marquee-rev { animation: marquee-rev 28s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee, .animate-marquee-rev { animation: none; }
        }
      `}</style>
    </div>
  );
}
