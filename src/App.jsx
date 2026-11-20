import { AudioProvider } from './context/AudioContext';
import BookLayout from './components/BookLayout';
import MusicToggle from './components/MusicToggle';

export default function App() {
  return (
    <AudioProvider>
      <main className="relative flex h-dvh w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#241238] via-[#3b1d5e] to-[#4a1942] px-2 py-3 sm:p-6">
        {/* Soft ambient decorative glows */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

        <MusicToggle />
        <BookLayout />
      </main>
    </AudioProvider>
  );
}