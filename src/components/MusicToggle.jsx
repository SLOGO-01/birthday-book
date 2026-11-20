import { Music, Pause, Play, SkipForward } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function MusicToggle() {
  const { currentTrack, isPlaying, togglePlay, nextTrack, tracks } = useAudio();

  return (
    <div className="fixed top-3 right-3 z-50 flex items-center gap-2 rounded-full border border-purple-500/30 bg-[#16111D]/90 px-3 py-1.5 text-white shadow-lg backdrop-blur-md sm:top-5 sm:right-6">
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-purple-700 to-pink-500 text-white transition hover:scale-105 active:scale-95"
      >
        {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}
      </button>

      <div className="hidden max-w-[140px] sm:block">
        <p className="truncate text-[11px] font-medium text-pink-100">
          {currentTrack?.title}
        </p>
      </div>

      {/* Subtle animated equalizer bars */}
      <div className="flex h-3 items-end gap-0.5 px-1">
        {[0, 1, 2].map((bar) => (
          <span
            key={bar}
            className={`w-0.5 rounded-full bg-pink-400 transition-all duration-300 ${
              isPlaying ? 'animate-pulse h-3' : 'h-1 opacity-40'
            }`}
            style={{ animationDelay: `${bar * 150}ms` }}
          />
        ))}
      </div>

      {tracks.length > 1 && (
        <button
          onClick={nextTrack}
          aria-label="Next track"
          className="rounded-full p-1 text-purple-200/70 transition hover:bg-white/10 hover:text-white"
        >
          <SkipForward className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}