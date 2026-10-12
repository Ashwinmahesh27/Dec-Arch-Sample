import React, { useState, useEffect, useRef } from 'react';
import { Story } from '../types/news';
import { Volume2, VolumeX, Pause, Play, Maximize2 } from 'lucide-react';

interface LeadStoryCardProps {
  story: Story;
  onSelectStory: (story: Story) => void;
  onOpenVisualDispatch: () => void;
}

export const LeadStoryCard: React.FC<LeadStoryCardProps> = ({
  story,
  onSelectStory,
  onOpenVisualDispatch,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setPlaybackSeconds((prev) => (prev >= 138 ? 0 : prev + 1));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenVisualDispatch();
  };

  return (
    <main className="p-3 w-full" data-purpose="main-content">
      {/* Bordered Story Card */}
      <article
        className="border border-[#121212] bg-white pt-5 pb-0 flex flex-col shadow-sm"
        data-purpose="lead-story-card"
      >
        {/* Free-to-read Top Notice */}
        <header className="text-center px-4 mb-5">
          <p className="text-[14px] text-[#121212] font-normal leading-snug">
            These top stories are <span className="font-bold">free to read.</span>
          </p>
          {/* Subtle Blue Underline Divider */}
          <div className="w-16 h-[2px] bg-[#326891] mx-auto mt-2" />
        </header>

        {/* Main Headline & Story Excerpt */}
        <div
          onClick={() => onSelectStory(story)}
          className="px-4 pb-4 cursor-pointer group"
        >
          {/* Main Breaking Headline */}
          <h2 className="headline-font text-[28px] sm:text-[30px] font-bold text-[#121212] mb-3 group-hover:text-[#326891] transition-colors leading-[1.15]">
            {story.headline}
          </h2>

          {/* Sub-headline / Summary Deck */}
          <p className="deck-font text-[14.5px] text-[#363636] font-normal mb-3 leading-relaxed">
            {story.deck}
          </p>

          {/* Read Time & Tap-to-read indicator */}
          <div className="flex items-center justify-between">
            <div className="meta-font text-[10px] font-semibold text-[#727272] uppercase tracking-wider">
              {story.readTime}
            </div>
            <span className="text-[11px] font-medium text-[#326891] opacity-0 group-hover:opacity-100 transition-opacity">
              Read article →
            </span>
          </div>
        </div>

        {/* BEGIN: MediaEmbed */}
        {/* Video/Photo Block with News Overlays */}
        <div
          className="relative w-full aspect-[4/5] sm:aspect-square media-backdrop overflow-hidden flex flex-col justify-between p-4 select-none"
          data-purpose="video-embed"
        >
          {/* Inner Faux Summit Photo Composition & Backdrop */}
          <div
            className="absolute inset-0 pointer-events-none opacity-85 mix-blend-screen bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: isPlaying
                ? `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 70%)`
                : `radial-gradient(circle at 50% 60%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
            }}
          >
            {/* Emulated crowd silhouettes and stage screen */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/80 to-transparent" />

            {/* Saudi Flag and Emblem Motif on screen in background */}
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 text-center text-white/40 font-serif text-sm tracking-widest uppercase border-b border-white/20 pb-1 w-3/4">
              <span className="text-xs opacity-75">KINGDOM OF SAUDI ARABIA</span>
            </div>
          </div>

          {/* Live broadcast animated radar / footage simulation when active */}
          {isPlaying && (
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center">
              {/* Radar pulse ripples */}
              <div className="w-48 h-48 rounded-full border border-emerald-400/30 animate-ping absolute" />
              <div className="w-72 h-72 rounded-full border border-emerald-500/20 absolute" />
              {/* Audio spectrum bar simulation */}
              <div className="absolute bottom-16 inset-x-8 flex items-end justify-center gap-1.5 h-10 opacity-70">
                {[12, 28, 36, 18, 44, 22, 38, 50, 24, 34, 16, 42, 26, 30].map((h, idx) => (
                  <span
                    key={idx}
                    className="w-1.5 bg-emerald-400 rounded-t transition-all duration-200"
                    style={{
                      height: `${(h * ((idx + playbackSeconds) % 5 + 2)) / 5}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Top Row: Location Tag & NYT Gothic 'T' Watermark */}
          <div className="relative z-10 flex justify-between items-start">
            {/* Geo & Date Stamp */}
            <div className="text-white drop-shadow-md">
              <h3 className="text-[14px] font-bold tracking-tight text-white leading-tight">
                {story.location || 'Riyadh, Saudi Arabia'}
              </h3>
              <p className="text-[13px] font-normal text-white/90 leading-tight">
                Oct. 11
              </p>
            </div>

            {/* NYT Gothic 'T' Logo Stamp */}
            <div className="text-white/90 drop-shadow-lg select-none">
              <span className="nyt-masthead text-[38px] leading-none font-bold inline-block opacity-95">
                T
              </span>
            </div>
          </div>

          {/* Center: Interactive Play Button Overlay */}
          <div className="relative z-10 self-center flex flex-col items-center gap-2">
            <button
              onClick={handleTogglePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              className="w-14 h-14 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-transform transform active:scale-95 shadow-xl text-white cursor-pointer group"
              type="button"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current text-white" />
              ) : (
                /* Play Icon Triangle */
                <svg className="w-6 h-6 text-white translate-x-0.5 fill-current" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            {isPlaying && (
              <span className="text-[11px] font-mono tracking-wider text-white/90 bg-black/50 px-2.5 py-0.5 rounded backdrop-blur-sm">
                {formatTime(playbackSeconds)} / {story.videoDuration || '02:18'}
              </span>
            )}
          </div>

          {/* Bottom Row: Controls & Expand / Fullscreen Control */}
          <div className="relative z-10 flex justify-between items-end">
            {/* Left audio / live dispatch tag */}
            <div className="flex items-center gap-2">
              {isPlaying ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white/90 border border-white/20 backdrop-blur-sm transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              ) : (
                <div className="text-white/80 text-[11px] font-sans font-medium bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded border border-white/15">
                  VISUAL INVESTIGATION
                </div>
              )}
            </div>

            {/* Right: Expand to Fullscreen */}
            <button
              onClick={handleExpand}
              aria-label="Expand to full screen"
              className="p-1 text-white/90 hover:text-white drop-shadow-md cursor-pointer transition-transform hover:scale-110 active:scale-95"
              type="button"
              title="Expand investigation player"
            >
              <svg
                className="w-5 h-5 stroke-current"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </div>
        </div>
        {/* END: MediaEmbed */}
      </article>
    </main>
  );
};
