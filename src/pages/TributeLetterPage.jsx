import { useState } from 'react';
import { Heart, Info } from 'lucide-react';

export default function TributeLetterPage({ badge, title, data, accent = 'purple' }) {
  const [showMeta, setShowMeta] = useState(false);

  const isPink = accent === 'pink';

  return (
    <div className="flex h-full flex-col justify-between">
      {/* Header */}
      <div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
            isPink ? 'bg-pink-100 text-pink-700' : 'bg-purple-100 text-purple-800'
          }`}
        >
          <Heart className="h-2.5 w-2.5 fill-current" />
          {badge}
        </span>
        <h2 className="mt-1.5 font-serif text-2xl font-bold text-[#1e1629] sm:text-3xl">
          {title}
        </h2>
      </div>

      {/* Scrapbook Photo Frame */}
      <div
        className={`group relative my-2 rounded-xl border bg-white p-2 shadow-md transition-transform duration-300 ${
          isPink ? 'rotate-1 border-purple-200 hover:rotate-0' : '-rotate-1 border-pink-200 hover:rotate-0'
        }`}
      >
        <img
          src={data.photo}
          alt={title}
          className="h-36 w-full rounded-lg object-cover sm:h-44"
        />

        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onClick={() => setShowMeta((prev) => !prev)}
          aria-label="Toggle photo note"
          className="absolute top-3.5 right-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-xs transition hover:bg-pink-600"
        >
          <Info className="h-3.5 w-3.5" />
        </button>

        {showMeta ? (
          <p className="mt-1.5 animate-pop-in text-center text-[11px] font-medium text-purple-800">
            Captured with love • Tap info icon to hide
          </p>
        ) : (
          <p className="mt-1.5 text-center font-serif text-xs italic text-purple-950/75">
            “{data.caption}”
          </p>
        )}
      </div>

      {/* Scrollable Letter Body */}
      <div
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className={`letter-scroll max-h-32 overflow-y-auto rounded-xl border bg-white/90 p-3 text-xs leading-relaxed text-[#251b33] shadow-2xs sm:max-h-36 sm:text-sm ${
          isPink ? 'border-pink-200/80' : 'border-purple-200/80'
        }`}
      >
        {data.message}
      </div>
    </div>
  );
}