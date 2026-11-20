import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

export default function LoveNotePage({ data }) {
  const [sentLove, setSentLove] = useState(false);

  const triggerHeartsConfetti = () => {
    setSentLove(true);
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#9333EA', '#EC4899', '#F472B6', '#C084FC', '#FFFFFF'],
    });
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-pink-300/70 bg-gradient-to-b from-purple-100/70 via-[#FFF8FC] to-pink-100/75 p-5 text-center">
      {/* Subtle floating decorative accents */}
      <Heart className="animate-float-gentle absolute top-5 left-5 h-4 w-4 fill-pink-400/40 text-pink-400/60" />
      <Sparkles className="animate-float-gentle absolute right-6 bottom-8 h-4 w-4 text-purple-500/50" />

      <span className="text-[10px] font-bold tracking-[0.28em] text-pink-600 uppercase">
        One Last Note
      </span>

      <h2 className="mt-1.5 bg-gradient-to-r from-purple-950 via-purple-800 to-pink-700 bg-clip-text font-serif text-4xl font-bold text-transparent">
        {data.heading}
      </h2>

      <div className="my-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />

      <div
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className="letter-scroll max-h-44 overflow-y-auto px-1"
      >
        <p className="font-serif text-base leading-relaxed italic text-[#231833] sm:text-lg">
          “{data.body}”
        </p>
      </div>

      <p className="mt-4 text-xs font-semibold tracking-widest text-purple-900 uppercase">
        — {data.signature}
      </p>

      <button
        type="button"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onClick={triggerHeartsConfetti}
        className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-700 to-pink-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-pink-500/25 transition hover:scale-105 active:scale-95"
      >
        <Heart className="h-3.5 w-3.5 fill-current" />
        {sentLove ? 'Love Sent!' : 'Send Birthday Love'}
      </button>
    </div>
  );
}