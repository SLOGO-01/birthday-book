import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { BOOK_DATA } from '../data/bookContent';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const tracks = BOOK_DATA.tracks;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(tracks[currentIndex].src);
    audio.loop = tracks.length === 1;
    audioRef.current = audio;

    const handleEnded = () => {
      setCurrentIndex((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener('ended', handleEnded);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const startMusic = () => {
    if (!audioRef.current || isPlaying) return;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  return (
    <AudioContext.Provider
      value={{
        tracks,
        currentTrack: tracks[currentIndex],
        isPlaying,
        togglePlay,
        startMusic,
        nextTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);