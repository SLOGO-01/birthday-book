import { Camera } from 'lucide-react';

export default function ThrowbacksPage({ items }) {
  return (
    <div className="flex h-full flex-col">
      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-pink-100 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-pink-700 uppercase">
        <Camera className="h-3 w-3" />
        Chapter 04 • Time Capsule
      </span>

      <h2 className="mt-1 font-serif text-2xl font-bold text-[#1e1629]">
        Throwbacks & Epic Moments
      </h2>

      <div
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className="letter-scroll mt-2.5 flex-1 space-y-3 overflow-y-auto pr-1"
      >
        {items.map((item, idx) => (
          <article
            key={item.id}
            className="animate-pop-in rounded-xl border border-purple-200/80 bg-white p-2.5 shadow-xs"
          >
            <div className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase">
              <span className="rounded bg-purple-900 px-2 py-0.5 text-pink-200">
                {item.year}
              </span>
              <span className="text-pink-600">{item.title}</span>
            </div>

            <div className="mt-2 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className={`h-28 w-full object-cover transition-transform duration-500 hover:scale-105 ${
                  idx % 2 === 0 ? 'object-top' : 'object-center'
                }`}
              />
            </div>

            <p className="mt-2 text-xs leading-snug text-[#2d223d]">{item.story}</p>
          </article>
        ))}
      </div>
    </div>
  );
}