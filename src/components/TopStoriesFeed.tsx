import React, { useState } from 'react';
import { Story, LiveUpdate } from '../types/news';
import { OTHER_STORIES, LIVE_UPDATES, PODCAST_EPISODE } from '../data/newsData';
import { Radio, Headphones, Play, Pause, ChevronRight, Bookmark, Share2 } from 'lucide-react';

interface TopStoriesFeedProps {
  onSelectStory: (story: Story) => void;
  onOpenMiniCrossword: () => void;
  onPlayPodcast: () => void;
  isPodcastPlaying: boolean;
  savedStoryIds: string[];
  onToggleSaveStory: (storyId: string) => void;
}

export const TopStoriesFeed: React.FC<TopStoriesFeedProps> = ({
  onSelectStory,
  onOpenMiniCrossword,
  onPlayPodcast,
  isPodcastPlaying,
  savedStoryIds,
  onToggleSaveStory,
}) => {
  const [showAllLiveUpdates, setShowAllLiveUpdates] = useState(false);

  return (
    <div className="w-full flex flex-col gap-3 px-3 pb-8 select-text">
      {/* LIVE UPDATES RIBBON */}
      <section className="bg-[#fcf8f2] border border-[#e5d5be] p-3 rounded-none">
        <div className="flex items-center justify-between pb-2 border-b border-[#e5d5be]/80">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#b91c1c] text-white text-[10px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Live
            </span>
            <span className="text-[12.5px] font-bold text-[#121212]">
              Regional Flights & Escalation
            </span>
          </div>
          <button
            onClick={() => setShowAllLiveUpdates(!showAllLiveUpdates)}
            className="text-[11.5px] font-medium text-[#326891] hover:underline cursor-pointer flex items-center"
          >
            {showAllLiveUpdates ? 'Collapse' : 'See 3 updates'}
            <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${showAllLiveUpdates ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Live items */}
        <div className="pt-2 flex flex-col gap-2">
          {LIVE_UPDATES.slice(0, showAllLiveUpdates ? 3 : 1).map((update, idx) => (
            <div key={idx} className="text-left">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="text-[10px] font-mono font-semibold text-[#8a5d3b]">
                  {update.time}
                </span>
                <h4 className="text-[13px] font-bold text-[#121212] leading-snug">
                  {update.headline}
                </h4>
              </div>
              <p className="text-[12px] text-[#4a4a4a] leading-relaxed pl-1">
                {update.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECONDARY EDITORIAL STORIES */}
      {OTHER_STORIES.map((story) => {
        const isSaved = savedStoryIds.includes(story.id);

        return (
          <article
            key={story.id}
            onClick={() => onSelectStory(story)}
            className="border-b border-[#e2e2e2] pb-4 pt-2 bg-white cursor-pointer group flex flex-col gap-2"
          >
            {/* Category Kicker */}
            <div className="flex items-center justify-between text-[11px] text-[#727272]">
              <span className="font-bold tracking-wider uppercase text-[#121212]">
                {story.kicker}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#727272]">{story.readTime}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSaveStory(story.id);
                  }}
                  className="p-1 hover:text-black transition-colors"
                  title={isSaved ? 'Remove from Saved' : 'Save story'}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${isSaved ? 'fill-black text-black' : 'text-[#727272]'}`}
                  />
                </button>
              </div>
            </div>

            {/* Layout with Image if available */}
            <div className="grid grid-cols-12 gap-3 items-start">
              <div className={story.image ? 'col-span-7 sm:col-span-8' : 'col-span-12'}>
                <h3 className="headline-font text-[20px] sm:text-[22px] font-bold text-[#121212] leading-[1.2] group-hover:text-[#326891] transition-colors mb-1.5">
                  {story.headline}
                </h3>
                <p className="deck-font text-[13.5px] text-[#444] line-clamp-3 leading-relaxed">
                  {story.deck}
                </p>
                <div className="mt-2 text-[11px] text-[#666]">
                  By <span className="font-semibold text-[#121212]">{story.author}</span>
                </div>
              </div>

              {story.image && (
                <div className="col-span-5 sm:col-span-4 relative aspect-[4/3] overflow-hidden bg-stone-100 border border-[#e2e2e2]">
                  <img
                    src={story.image}
                    alt={story.headline}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </div>
          </article>
        );
      })}

      {/* "THE DAILY" PODCAST FEATURE CARD */}
      <section className="border border-[#121212] p-4 bg-[#f9f9f9] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Headphones className="w-4 h-4 text-[#121212]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#121212]">
              The Daily · Audio
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#666]">
            {PODCAST_EPISODE.duration}
          </span>
        </div>

        <h3 className="headline-font text-[18px] font-bold text-[#121212] leading-snug">
          {PODCAST_EPISODE.title}
        </h3>

        <p className="text-[12.5px] text-[#444] leading-relaxed">
          {PODCAST_EPISODE.description}
        </p>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-[11.5px] text-[#666]">
            Hosted by <strong className="text-black">{PODCAST_EPISODE.host}</strong>
          </span>

          <button
            onClick={onPlayPodcast}
            className="flex items-center gap-1.5 bg-[#121212] text-white hover:bg-[#333] px-3 py-1.5 text-[12px] font-semibold transition-colors cursor-pointer"
          >
            {isPodcastPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Listen Now</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* THE MINI CROSSWORD CALLOUT */}
      <section
        onClick={onOpenMiniCrossword}
        className="border border-[#121212] p-4 bg-white cursor-pointer hover:border-[#326891] transition-colors group flex items-center justify-between"
      >
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 border-2 border-black grid grid-cols-2 grid-rows-2 p-0.5 bg-black shrink-0">
            <div className="bg-white m-[1px] flex items-center justify-center text-[10px] font-bold">S</div>
            <div className="bg-white m-[1px]" />
            <div className="bg-white m-[1px]" />
            <div className="bg-white m-[1px] flex items-center justify-center text-[10px] font-bold">T</div>
          </div>
          <div>
            <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#727272]">
              NYT Games
            </div>
            <h4 className="headline-font text-[17px] font-bold text-[#121212] group-hover:text-[#326891] transition-colors">
              The Mini Crossword
            </h4>
            <p className="text-[12px] text-[#666]">
              Solve today’s bite-sized 5×5 puzzle in under 2 minutes.
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-[#999] group-hover:text-black group-hover:translate-x-1 transition-all" />
      </section>

      {/* EDITORIAL FOOTER */}
      <footer className="pt-6 border-t border-[#e2e2e2] text-center text-[#727272] flex flex-col gap-2">
        <div className="nyt-masthead text-[22px] text-[#121212] select-none">
          The New York Times
        </div>
        <p className="text-[11px]">
          © 2026 The New York Times Company. All rights reserved.
        </p>
        <div className="flex justify-center gap-3 text-[11px] text-[#555] font-medium">
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span>·</span>
          <span className="hover:underline cursor-pointer">Terms of Service</span>
          <span>·</span>
          <span className="hover:underline cursor-pointer">Site Map</span>
        </div>
      </footer>
    </div>
  );
};
