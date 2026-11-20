import { useState } from 'react';
import { MessageCircleHeart, Sparkles } from 'lucide-react';

export default function NotesCardsPage({ notes }) {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-purple-800 uppercase">
          <MessageCircleHeart className="h-3 w-3 text-pink-600" />
          Chapter 03 • Loved Ones
        </span>
        <span className="text-[10px] font-medium text-purple-700/70">Tap a card</span>
      </div>

      <h2 className="mt-1 font-serif text-2xl font-bold text-[#1e1629]">
        Notes from Others
      </h2>

      <div
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className="letter-scroll mt-2.5 flex-1 space-y-2.5 overflow-y-auto pr-1"
      >
        {notes.map((note, idx) => {
          const isSelected = activeId === note.id;
          return (
            <div
              key={note.id}
              onClick={() => setActiveId(isSelected ? null : note.id)}
              className={`cursor-pointer rounded-xl border p-3 transition-all duration-200 ${
                isSelected
                  ? 'scale-[1.01] border-pink-400 bg-gradient-to-br from-white via-pink-50/60 to-purple-50/70 shadow-md'
                  : 'border-purple-200/80 bg-white shadow-2xs hover:border-pink-300'
              } ${idx % 2 === 0 ? '-rotate-[0.6deg]' : 'rotate-[0.6deg]'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-base font-bold text-purple-950">
                    {note.sender}
                  </span>
                  {isSelected && <Sparkles className="h-3.5 w-3.5 text-pink-500" />}
                </div>
                <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-semibold text-pink-700">
                  {note.tag}
                </span>
              </div>

              <p className="mt-1.5 text-xs leading-relaxed text-[#2d223d]">
                {note.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}