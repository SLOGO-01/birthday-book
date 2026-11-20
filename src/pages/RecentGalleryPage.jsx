import { useState } from 'react';
import { ChevronLeft, ChevronRight, Images, LayoutGrid, Maximize2, X } from 'lucide-react';

export default function RecentGalleryPage({ photos }) {
  const [mode, setMode] = useState('slideshow'); // 'slideshow' | 'grid'
  const [slideIndex, setSlideIndex] = useState(0);
  const [zoomPhoto, setZoomPhoto] = useState(null);

  const safePhotos = Array.isArray(photos) && photos.length > 0 ? photos : [];
  const currentSlide = safePhotos[slideIndex] || safePhotos[0];

  const stopFlipEvent = (e) => {
    e.stopPropagation();
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (safePhotos.length <= 1) return;
    setSlideIndex((prev) => (prev - 1 + safePhotos.length) % safePhotos.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (safePhotos.length <= 1) return;
    setSlideIndex((prev) => (prev + 1) % safePhotos.length);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Top Bar + View Mode Switcher */}
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-purple-800 uppercase">
          <Images className="h-3 w-3 text-pink-600" />
          Chapter 05 • Right Now
        </span>

        <div className="relative z-20 flex items-center rounded-full border border-purple-200 bg-white p-0.5 text-[10px]">
          <button
            type="button"
            onPointerDown={stopFlipEvent}
            onMouseDown={stopFlipEvent}
            onTouchStart={stopFlipEvent}
            onClick={(e) => {
              e.stopPropagation();
              setMode('slideshow');
            }}
            className={`cursor-pointer rounded-full px-2 py-0.5 font-medium transition ${
              mode === 'slideshow' ? 'bg-purple-800 text-white' : 'text-purple-900/70'
            }`}
          >
            Slides
          </button>
          <button
            type="button"
            onPointerDown={stopFlipEvent}
            onMouseDown={stopFlipEvent}
            onTouchStart={stopFlipEvent}
            onClick={(e) => {
              e.stopPropagation();
              setMode('grid');
            }}
            className={`flex cursor-pointer items-center gap-0.5 rounded-full px-2 py-0.5 font-medium transition ${
              mode === 'grid' ? 'bg-pink-600 text-white' : 'text-purple-900/70'
            }`}
          >
            <LayoutGrid className="h-2.5 w-2.5" /> Grid
          </button>
        </div>
      </div>

      <h2 className="mt-1 font-serif text-2xl font-bold text-[#1e1629]">
        Recent Pictures
      </h2>

      {/* Slideshow View */}
      {mode === 'slideshow' && currentSlide ? (
        <div className="mt-2.5 flex flex-1 flex-col justify-between rounded-2xl border border-pink-200/90 bg-white p-2.5 shadow-sm">
          <div className="relative flex-1 overflow-hidden rounded-xl bg-purple-950/5">
            <img
              key={currentSlide.id}
              src={currentSlide.url}
              alt={currentSlide.caption}
              onPointerDown={stopFlipEvent}
              onMouseDown={stopFlipEvent}
              onTouchStart={stopFlipEvent}
              onClick={(e) => {
                e.stopPropagation();
                setZoomPhoto(currentSlide);
              }}
              className="h-full w-full cursor-zoom-in animate-pop-in object-cover"
            />

            <button
              type="button"
              onPointerDown={stopFlipEvent}
              onMouseDown={stopFlipEvent}
              onTouchStart={stopFlipEvent}
              onClick={(e) => {
                e.stopPropagation();
                setZoomPhoto(currentSlide);
              }}
              aria-label="Zoom image"
              className="absolute top-2.5 right-2.5 z-20 cursor-pointer rounded-full bg-black/60 p-1.5 text-white backdrop-blur-xs transition hover:bg-pink-600"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>

            {safePhotos.length > 1 && (
              <>
                <button
                  type="button"
                  onPointerDown={stopFlipEvent}
                  onMouseDown={stopFlipEvent}
                  onTouchStart={stopFlipEvent}
                  onClick={handlePrev}
                  aria-label="Previous photo"
                  className="absolute top-1/2 left-2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-black/60 p-1.5 text-white backdrop-blur-xs transition hover:bg-purple-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onPointerDown={stopFlipEvent}
                  onMouseDown={stopFlipEvent}
                  onTouchStart={stopFlipEvent}
                  onClick={handleNext}
                  aria-label="Next photo"
                  className="absolute top-1/2 right-2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-black/60 p-1.5 text-white backdrop-blur-xs transition hover:bg-purple-700"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          <div className="mt-2 text-center">
            <p className="font-serif text-sm italic text-purple-950">
              “{currentSlide.caption}” ({slideIndex + 1}/{safePhotos.length})
            </p>
            <div className="mt-1.5 flex items-center justify-center gap-1.5">
              {safePhotos.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onPointerDown={stopFlipEvent}
                  onMouseDown={stopFlipEvent}
                  onTouchStart={stopFlipEvent}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlideIndex(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 cursor-pointer rounded-full transition-all ${
                    idx === slideIndex ? 'w-5 bg-pink-600' : 'w-1.5 bg-purple-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div
          onPointerDown={stopFlipEvent}
          onMouseDown={stopFlipEvent}
          onTouchStart={stopFlipEvent}
          className="letter-scroll mt-2.5 grid flex-1 grid-cols-2 gap-2 overflow-y-auto pr-1"
        >
          {safePhotos.map((pic) => (
            <div
              key={pic.id}
              onClick={(e) => {
                e.stopPropagation();
                setZoomPhoto(pic);
              }}
              className="cursor-pointer rounded-xl border border-pink-200/80 bg-white p-1.5 shadow-2xs transition hover:-translate-y-0.5"
            >
              <img
                src={pic.url}
                alt={pic.caption}
                className="h-24 w-full rounded-lg object-cover"
              />
              <p className="mt-1 truncate text-center font-serif text-[11px] italic text-purple-950">
                {pic.caption}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {zoomPhoto && (
        <div
          onPointerDown={stopFlipEvent}
          onMouseDown={stopFlipEvent}
          onTouchStart={stopFlipEvent}
          onClick={() => setZoomPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md animate-pop-in rounded-2xl border border-pink-400/30 bg-[#191026] p-3 text-white shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setZoomPhoto(null)}
              aria-label="Close preview"
              className="absolute top-4 right-4 z-10 cursor-pointer rounded-full bg-black/60 p-1.5 text-pink-200 hover:bg-pink-600 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={zoomPhoto.url}
              alt={zoomPhoto.caption}
              className="max-h-[65dvh] w-full rounded-xl object-contain"
            />
            <p className="mt-2.5 text-center font-serif text-base italic text-pink-200">
              {zoomPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}