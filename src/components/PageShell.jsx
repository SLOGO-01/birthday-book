import { forwardRef } from 'react';

const PageShell = forwardRef(({ children, pageNumber, totalPages, dark = false }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative h-full w-full overflow-hidden select-none ${
        dark
          ? 'bg-gradient-to-br from-[#190f26] via-[#120b1c] to-[#0b0711] text-white'
          : 'scrapbook-paper text-[#1e1629]'
      }`}
    >
      {/* Left spine crease shadow */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r ${
          dark ? 'from-black/55 to-transparent' : 'from-purple-950/12 to-transparent'
        }`}
      />

      {/* Inner Page Content */}
      <div className="relative z-0 flex h-full w-full flex-col justify-between px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>

        {pageNumber && (
          <div className="mt-2 flex shrink-0 items-center justify-between border-t border-purple-900/10 pt-1.5 text-[10px] font-medium tracking-widest text-purple-900/55 uppercase">
            <span className="text-pink-600/80">✦ Scrapbook</span>
            <span>
              {pageNumber} / {totalPages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

PageShell.displayName = 'PageShell';
export default PageShell;