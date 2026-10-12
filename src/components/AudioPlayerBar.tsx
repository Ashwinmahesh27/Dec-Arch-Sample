import React, { useState, useEffect } from 'react';
import { Play, Pause, X, RotateCcw, RotateCw, Volume2, Headphones } from 'lucide-react';

interface AudioPlayerBarProps {
  title: string;
  subtitle: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  title,
  subtitle,
  isPlaying,
  onTogglePlay,
  onClose,
}) => {
  const [secondsElapsed, setSecondsElapsed] = useState(14);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1x' | '1.25x' | '1.5x'>('1x');

  useEffect(() => {
    let timer: number;
    if (isPlaying) {
      timer = window.setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSpeedToggle = () => {
    setPlaybackSpeed((prev) => (prev === '1x' ? '1.25x' : prev === '1.25x' ? '1.5x' : '1x'));
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#121212] text-white px-4 py-2.5 flex items-center justify-between shadow-2xl border-t border-white/10 select-none">
      <div className="flex items-center gap-3 overflow-hidden pr-2">
        <div className="w-9 h-9 bg-stone-800 rounded flex items-center justify-center shrink-0 border border-white/20">
          <Headphones className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-bold truncate text-white">{title}</h4>
          <p className="text-[11px] text-stone-400 truncate">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <span className="text-[11px] font-mono text-stone-400 hidden sm:inline">
          {formatTime(secondsElapsed)}
        </span>

        {/* Play/Pause */}
        <button
          onClick={onTogglePlay}
          className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-stone-200 transition-colors"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        {/* Speed toggle */}
        <button
          onClick={handleSpeedToggle}
          className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-700 transition-colors"
          title="Playback speed"
        >
          {playbackSpeed}
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          className="p-1 text-stone-400 hover:text-white transition-colors ml-1"
          title="Dismiss player"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
