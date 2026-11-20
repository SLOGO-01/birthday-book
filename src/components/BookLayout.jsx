import { useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import confetti from 'canvas-confetti';
import { ChevronLeft, ChevronRight, PartyPopper, RotateCcw, Sparkles } from 'lucide-react';
import PageShell from './PageShell';
import TributeLetterPage from '../pages/TributeLetterPage';
import NotesCardsPage from '../pages/NotesCardsPage';
import ThrowbacksPage from '../pages/ThrowbacksPage';
import RecentGalleryPage from '../pages/RecentGalleryPage';
import LoveNotePage from '../pages/LoveNotePage';
import { BOOK_DATA } from '../data/bookContent';
import { useAudio } from '../context/AudioContext';

function computeBookDimensions() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const mobile = w < 768;

  if (mobile) {
    const width = Math.min(Math.max(w - 24, 310), 390);
    const height = Math.min(Math.max(h - 128, 520), 650);
    return { width, height, isMobile: true };
  }

  const pageWidth = Math.min(Math.max(Math.floor((w - 120) / 2), 340), 450);
  const pageHeight = Math.min(Math.max(h - 130, 520), 660);
  return { width: pageWidth, height: pageHeight, isMobile: false };
}

export default function BookLayout() {
  const bookRef = useRef(null);
  const { startMusic } = useAudio();
  const [currentPage, setCurrentPage] = useState(0);
  const [layout, setLayout] = useState(computeBookDimensions);

  useEffect(() => {
    const handleResize = () => {
      setLayout(computeBookDimensions());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenBook = () => {
    startMusic();
    bookRef.current?.pageFlip()?.flipNext();
  };

  const handleCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#9333EA', '#EC4899', '#F472B6', '#C084FC', '#FDE047'],
    });
  };

  const totalPages = 8;
  const { width, height, isMobile } = layout;

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <div
        className="relative flex shrink-0 items-center justify-center transition-all duration-200"
        style={{
          width: isMobile ? `${width}px` : `${width * 2}px`,
          height: `${height}px`,
        }}
      >
      <HTMLFlipBook
  key={`${isMobile ? 'm' : 'd'}-${width}-${height}`}
  ref={bookRef}
  width={width}
  height={height}
  size="fixed"
  showCover={true}
  usePortrait={isMobile}
  mobileScrollSupport={false}
  useMouseEvents={true}
  clickEventForward={true}
  drawShadow={true}
  maxShadowOpacity={0.35}
  flippingTime={450}
  onFlip={(e) => setCurrentPage(e.data)}
  className="rounded-r-xl shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
>
          {/* 1. FRONT COVER */}
          <PageShell dark>
            <div className="flex h-full flex-col items-center justify-between rounded-xl border border-pink-400/30 bg-gradient-to-b from-purple-950/40 via-transparent to-pink-950/30 p-5 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-400/35 bg-purple-900/40 px-3.5 py-1 text-[10px] font-medium tracking-[0.22em] text-pink-200 uppercase">
                <Sparkles className="h-3 w-3 text-pink-400" />
                {BOOK_DATA.celebrant.date}
              </span>

              <div className="my-auto py-4">
                <p className="text-xs font-semibold tracking-[0.28em] text-pink-300 uppercase">
                  {BOOK_DATA.celebrant.milestone}
                </p>
                <h1 className="mt-2 bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text font-serif text-4xl font-bold text-transparent sm:text-5xl">
                  {BOOK_DATA.celebrant.name}
                </h1>
                <div className="mx-auto my-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                <p className="mx-auto max-w-[250px] text-xs leading-relaxed text-purple-100/80 sm:text-sm">
                  {BOOK_DATA.celebrant.coverSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenBook}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 px-6 py-3 text-xs font-semibold tracking-wider text-white uppercase shadow-lg shadow-pink-500/30 transition hover:scale-105 active:scale-95"
              >
                Open Scrapbook
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </PageShell>

          {/* 2. MUMMY & DADDY */}
          <PageShell pageNumber={2} totalPages={totalPages}>
            <TributeLetterPage
              badge="Chapter 01 • Parents"
              title={BOOK_DATA.mummyAndDaddy.title}
              data={BOOK_DATA.mummyAndDaddy}
              accent="purple"
            />
          </PageShell>

          {/* 3. TOLU */}
          <PageShell pageNumber={3} totalPages={totalPages}>
            <TributeLetterPage
              badge="Chapter 02 • Special Note"
              title={BOOK_DATA.toluNote.title}
              data={BOOK_DATA.toluNote}
              accent="pink"
            />
          </PageShell>

          {/* 4. NOTES FROM OTHERS */}
          <PageShell pageNumber={4} totalPages={totalPages}>
            <NotesCardsPage notes={BOOK_DATA.otherNotes} />
          </PageShell>

          {/* 5. THROWBACKS & EPIC MOMENTS */}
          <PageShell pageNumber={5} totalPages={totalPages}>
            <ThrowbacksPage items={BOOK_DATA.throwbacks} />
          </PageShell>

          {/* 6. RECENT PICTURES */}
          <PageShell pageNumber={6} totalPages={totalPages}>
            <RecentGalleryPage photos={BOOK_DATA.recentGallery} />
          </PageShell>

          {/* 7. I LOVE YOU MESSAGE */}
          <PageShell pageNumber={7} totalPages={totalPages}>
            <LoveNotePage data={BOOK_DATA.closingLoveNote} />
          </PageShell>

          {/* 8. BACK COVER */}
          <PageShell dark>
            <div className="flex h-full flex-col items-center justify-center rounded-xl border border-pink-400/25 bg-gradient-to-b from-pink-950/25 via-transparent to-purple-950/40 p-5 text-center">
              <p className="text-xs tracking-[0.25em] text-pink-300 uppercase">
                The End — For Now
              </p>
              <h3 className="mt-2 font-serif text-3xl font-bold text-white">
                Happy Birthday!
              </h3>

              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={handleCelebrate}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-pink-500/25 transition hover:scale-105 active:scale-95"
                >
                  <PartyPopper className="h-3.5 w-3.5" />
                  Celebrate Again
                </button>

                <button
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={() => bookRef.current?.pageFlip()?.flip(0)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-pink-400/40 bg-purple-900/40 px-5 py-2 text-xs font-medium text-pink-200 transition hover:bg-pink-500/20"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Back to Cover
                </button>
              </div>
            </div>
          </PageShell>
        </HTMLFlipBook>
      </div>

      {/* Bottom Controls */}
      <div className="mt-3 flex shrink-0 items-center gap-4 text-xs font-medium text-pink-100/90">
        <button
          type="button"
          onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
          disabled={currentPage === 0}
          className="flex items-center gap-1 rounded-full border border-pink-400/30 bg-white/10 px-3.5 py-1.5 backdrop-blur-xs transition hover:bg-white/20 disabled:opacity-30"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Prev
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => bookRef.current?.pageFlip()?.flipNext()}
          disabled={currentPage >= totalPages - 1}
          className="flex items-center gap-1 rounded-full border border-pink-400/30 bg-white/10 px-3.5 py-1.5 backdrop-blur-xs transition hover:bg-white/20 disabled:opacity-30"
        >
          Next <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}